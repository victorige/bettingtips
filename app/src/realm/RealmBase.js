import {realm} from "./Realm";

export default class RealmBase<T> {

    constructor(typeName: string) {
        this.typeName = typeName;
    }

    create(object: T) {
        realm.write(() => {
            realm.create(this.typeName, object);
        });
    }

    createOrUpdate(object: T) {
        realm.write(() => {
            realm.create(this.typeName, object, true);
        });
    }

    update(object: T) {
        realm.write(() => {
            realm.create(this.typeName, object, true);
        });
    }

    delete(object: T) {
        realm.write(() => {
            return realm.delete(object);
        });
    }

    deleteArray(objects: Array<T>) {
        realm.write(() => {
            return realm.delete(objects);
        });
    }

    getAll(): Array<T> {
        return realm.objects(this.typeName);
    }

    getALlSortedByTime(): Array<T> {
        return realm.objects(this.typeName).sorted('time', true);
    }

    getObject(id) {
        return realm.objects(this.typeName).filtered('id = '+`"${id}"`);
    }

    getLastElements(): Array<T> {
        return realm.objects(this.typeName)[0];
    }

    getLength() {
        return realm.objects(this.typeName).length;
    }

    clearAll() {
        this.deleteArray(this.getAll())
    }

    static addListener(callback) {
        realm.addListener('change', callback)
    }

    static removeListener(callback) {
        realm.removeListener('change', callback)
    }

    static removeAllListeners() {
        realm.removeAllListeners()
    }

}