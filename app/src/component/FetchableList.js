import React, {Component} from 'react';
import {FlatList, View, StyleSheet, ActivityIndicator, Platform, ScrollView, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {request} from "../api/Api";
import {APP_COLOR, LOADING_COLOR} from "../../res/style/AppStyle";
import {sizeWidth} from "../util/Size";

const INITIAL_FETCHABLE_PAGE = 0;

export default class FetchableList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            firstLoad: true,
            reachedEnd: false,
            refreshing: false,
            page: INITIAL_FETCHABLE_PAGE,
            items: [],
            endpoint: this.props.endpoint,
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.endpoint !== this.props.endpoint) {
            this.setState({
                loading: false,
                reachedEnd: false,
                refreshing: false,
                page: INITIAL_FETCHABLE_PAGE,
                endpoint: nextProps.endpoint,
            });
        }

        if (nextProps.addItem !== this.props.addItem) {
            this.addItem(nextProps.addItem)
        }
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.endpoint !== this.state.endpoint) {
            this.reload();
        }
    };

    updateItem(keyName: string, keyValue, newItem) {
        const {items} = this.state;
        this.setState({
            items: items.map(item => {
                if (item[keyName] === keyValue) {
                    return {...item, ...newItem};
                }
                return item;
            })
        })
    }

    addItem(addItem) {
        const {items} = this.state;
        this.setState({
            items: [addItem, ...items]
        });
    }

    componentDidMount() {
        this.fetchFirstTime();
    }

    getItems = (data, page) => {
        const {exceptPage} = this.props;
        if (exceptPage && exceptPage[page]) {
            const dataPath = exceptPage[page].dataPath;
            if (!dataPath) return data;
            const paths = dataPath.split('.');
            paths.forEach((path) => {
                data = data[path];
            });
            return data;
        }

        const {dataPath} = this.props;
        if (!dataPath) return data;
        const paths = dataPath.split('.');

        paths.forEach((path) => {
            data = data[path];
        });

        return data;

    };

    getEndpoint = (page) => {
        if (this.props.loadMoreEnable) {
            const {exceptPage} = this.props;
            if (exceptPage && exceptPage[page]) {
                return exceptPage[page].url;
            }
            return this.state.endpoint.replace('${page}', page);
        }

        return this.state.endpoint;
    };

    fetchFirstTime = () => {
        this.setState({
            loading: true,
        });
        const page = INITIAL_FETCHABLE_PAGE + 1;
        const endpoint = this.getEndpoint(page);
        request(endpoint, 'GET')
            .then(data => {
                const items = this.getItems(data, page);
                if (items.length !== 0) {
                    this.setState({
                        items: [...this.state.items, ...items],
                        loading: false,
                        firstLoad: false,
                        page
                    })
                } else {
                    this.setState({
                        loading: false,
                        reachedEnd: true,
                        firstLoad: false,
                        page
                    })
                }

                const {onLoad} = this.props;
                if (onLoad) {
                    onLoad(data, page)
                }
            })
            .catch(error => {
                const {onError} = this.props;
                if (onError) {
                    onError(error);
                }
                this.setState({
                    loading: false,
                    firstLoad: false,
                })
            })
        ;
    };

    fetchPage = (page) => {
        this.setState({
            loading: true,
        });

        const endpoint = this.getEndpoint(page);
        request(endpoint, 'GET')
            .then(data => {
                const items = this.getItems(data, page);
                if (items.length !== 0) {
                    this.setState({
                        items: [...this.state.items, ...items],
                        loading: false,
                        page
                    })
                } else {
                    this.setState({
                        loading: false,
                        reachedEnd: true,
                        page
                    })
                }

                const {onLoad} = this.props;
                if (onLoad) {
                    onLoad(data, page)
                }
            })
            .catch(error => {
                const {onError} = this.props;
                if (onError) {
                    onError(error);
                }
                this.setState({
                    loading: false,
                })
            });
    };


    refresh = () => {
        this.setState({
            refreshing: true,
            loading: true,
            reachedEnd: false,
        });

        const page = INITIAL_FETCHABLE_PAGE + 1;
        const endpoint = this.getEndpoint(page);
        request(endpoint, 'GET')
            .then(data => {
                const items = this.getItems(data, page);
                if (items.length !== 0) {
                    this.setState({
                        items: items,
                        loading: false,
                        page: page,
                        refreshing: false,
                    })
                } else {
                    this.setState({
                        items: [],
                        loading: false,
                        reachedEnd: true,
                        page: page,
                        refreshing: false,
                    })
                }

                const {onLoad} = this.props;
                if (onLoad) {
                    onLoad(data, page)
                }
            })
            .catch(error => {
                const {onError} = this.props;
                if (onError) {
                    onError(error);
                }
                this.setState({
                    loading: false,
                    refreshing: false,
                })
            });
        const {onRefresh} = this.props;
        if (onRefresh) {
            onRefresh();
        }
    };

    reload = () => {
        this.setState({
            loading: true,
            reachedEnd: false,
        });
        const page = INITIAL_FETCHABLE_PAGE + 1;
        const endpoint = this.getEndpoint(page);

        request(endpoint, 'GET')
            .then(data => {
                const items = this.getItems(data, page);
                if (items.length !== 0) {
                    this.setState({
                        items: items,
                        loading: false,
                        page: page,
                    })
                } else {
                    this.setState({
                        loading: false,
                        reachedEnd: true,
                        page: page,
                        items: [],
                    })
                }

                const {onLoad} = this.props;
                if (onLoad) {
                    onLoad(data, page)
                }
            })
            .catch(error => {
                const {onError} = this.props;
                if (onError) {
                    onError(error);
                }
                this.setState({
                    loading: false,
                })
            })
    };

    onRefresh = () => {
        const {refreshEnable} = this.props;
        if (!refreshEnable) return;

        const {refreshing} = this.state;
        if (!refreshing) {
            this.refresh();
        }
    };

    onEndReached = () => {
        const {loadMoreEnable} = this.props;
        if (!loadMoreEnable) return;

        const {loading, reachedEnd} = this.state;
        if (!reachedEnd && !loading) {
            this.fetchPage(this.state.page + 1);
        }
    };

    renderFooterComponent = () => {
        const {loading, firstLoad, refreshing, showLoadMoreIndicator} = this.state;
        if (loading && !firstLoad && !refreshing && showLoadMoreIndicator) {
            const size = Platform.OS === 'ios' ? 'large' : sizeWidth(8);
            return <ActivityIndicator style={{marginVertical: 4}} animating={true} size={size} color={LOADING_COLOR}/>
        }
    };

    flatListScrollToIndex = () => {
        this.flatList.scrollToIndex({animated: true, index: 0});
    };

    render() {
        const {EmptyComponent, HeaderComponent, keyExtractor, renderItem, renderSeparator, onViewableChanged} = this.props;
        const {refreshEnable, loadMoreEnable} = this.props;
        const refreshing = refreshEnable ? this.state.refreshing : null;
        const onRefresh = refreshEnable ? this.onRefresh : null;
        const onEndReached = loadMoreEnable ? this.onEndReached : null;
        const onEndReachedThreshold = loadMoreEnable ? this.props.onEndReachedThreshold || 0.2 : null;
        if (this.state.firstLoad) {
            const size = Platform.OS === 'ios' ? 'large' : sizeWidth(9);
            return (
                <View style={styles.FirstLoadWrapper}>
                    <ActivityIndicator animating={true} size={size} color={LOADING_COLOR}/>
                </View>
            )
        }

        if (this.state.items.length === 0 && EmptyComponent) {
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={styles.Container}>
                    {HeaderComponent}
                    {EmptyComponent}
                </ScrollView>
            );
        }

        return (
            <FlatList
                {...this.props}
                ref={(ref) => this.flatList = ref}
                ListHeaderComponent={HeaderComponent}
                data={this.state.items}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={LOADING_COLOR}
                    />
                }
                scrollEnabled={this.props.scrollEnabled}
                ItemSeparatorComponent={renderSeparator}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold || 0}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListFooterComponent={this.renderFooterComponent()}
                onViewableItemsChanged={onViewableChanged}
                viewabilityConfig={this.viewabilityConfig}
            />
        );
    }

    viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50
    };
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    FirstLoadWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

FetchableList.defaultProps = {
    refreshEnable: true,
    loadMoreEnable: true,
    scrollEnabled: true,
    showLoadMoreIndicator: true,
};

FetchableList.propTypes = {
    numColumns: PropTypes.number,
    endpoint: PropTypes.string.isRequired,
    renderSeparator: PropTypes.func,
    refreshEnable: PropTypes.bool,
    keyExtractor: PropTypes.func,
    renderItem: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,
    loadMoreEnable: PropTypes.bool,
    EmptyComponent: PropTypes.element,
    HeaderComponent: PropTypes.element,
    dataPath: PropTypes.string,
    onLoad: PropTypes.func,
    onRefresh: PropTypes.func,
    exceptPage: PropTypes.object,
    addItem: PropTypes.object,
    inverted: PropTypes.bool,
    onViewableChanged: PropTypes.func,
    showLoadMoreIndicator: PropTypes.bool,
    onError: PropTypes.func
};