module.exports.Route = class Route {
    constructor(path){
        this.path = path.split("?")[0]

        this.parameters = []
        let array = (path.split("?")[1]).split("&")
        let  parameter = {};
        for (let i=0; i<(path.split("?")[1]).split("&").length; i++){
            parameter[array[i].split("=")[0]]=array[i].split("=")[1]
            this.parameters.push(parameter)
        }
    }
    hasParam( name ){
        for ( let i=0; i<this.parameters.length; i++ ){
            if ( name in this.parameters[i]){
                return true
            }
        }
        return false
    }

    getParam( name ){
        for ( let i=0; i<this.parameters.length; i++ ){
            if ( name in this.parameters[i]){
                return this.parameters[i][name]
            }
        }
        return null;
    }

    getPath(){
        return this.path
    }

    isPath( path ){
        if ( this.path == path)
            return true
        return false
    }
}