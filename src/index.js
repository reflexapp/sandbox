import app from "app"
import {GenericContainer, Services, services} from "@reflexiv/reflexiv"

/* service options */
var _services_ = new Services()
app.dependencies.forEach((d)=>{
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

app.create = (el, state) => {
    var core = {}
    var state = state || {}
    var container = new GenericContainer(el)
    initServices(core,_services_).then(()=>{
        app.render(core)(container, state)
    })
    return container
}
export {app}
