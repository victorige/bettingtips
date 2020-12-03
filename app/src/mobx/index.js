import LoadingStore from "./LoadingStore";
import UserStore from "./UserStore";
import NavigationStore from "./NavigationStore";

const loadingStore = new LoadingStore()
const navigationStore = new NavigationStore()
const userStore = new UserStore()

export default {
    loadingStore: loadingStore,
    navigationStore: navigationStore,
    userStore: userStore,
}