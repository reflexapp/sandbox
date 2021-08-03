import app from "app"
import {GenericContainer, Services, serviceBridge} from "@reflexiv/reflexiv"

/* service options */
var services = new Services()
services.Register("@reflexiv/service-bridge",{init:serviceBridge, options:{}})

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

app.create = (el) => {
    var core = {}
    var state = {}
    var container = new GenericContainer(el)
    initServices(core,services).then(()=>{
        app.render(core)(container, state)
    })
    return container
}
export {app}
