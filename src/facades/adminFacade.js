import fetchHelper, {errorChecker} from "./fetchHelpers"

const URL = require("../../package.json").serverURL;


class AdminStore {
    fetchResources(resourceUrl, cb) {
        let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + resourceUrl, options)
            .then((res) => {
                resFromFirstPromise = res;
                return res.json();
            }).then((data) => {
            errorChecker(resFromFirstPromise, data);
            if (cb) {
                cb(null, data.message)
            }
        }).catch(err => {
            console.log(JSON.stringify(err))
            if (cb) {
                cb({err: fetchHelper.addJustErrorMessage(err)})
            }
        })
    }
}

let adminStore = new AdminStore();

export default adminStore;