import app from "app"
import {GenericContainer,Services} from "@reflexiv/base"
import serviceData from "@reflexiv/service-data"
import serviceBridge from "@reflexiv/service-bridge"
var _app = app({})
const services = {
    "data":serviceData,
    "bridge":serviceBridge
}
/* service options */
var _services_ = new Services()
_app.dependencies.forEach((d)=>{
    _services_.Register("@reflexiv/service-"+d, {init:services[d], options:{}})
})
const initServices = (core, services) => {
        var q = services.List().map((s) => {
            var f 
            if ("init" in s && "options" in s) {
                f = new s.init(core, s.options)
            } else if (typeof s == "function") {
                f = new s(core)
            } 
            return f.init().then((d) => {
                f.start()
            })
        }) 
        return Promise.all(q)
}

_app.create = (el, state) => {
    var core = {}
    var state = state || {}
    var container = new GenericContainer(el)
    initServices(core,_services_).then(()=>{
        _app.render(core)(container, state)
    })
    return container
}
export {_app as app}
