require('dotenv').config()

const {PORT} = process.env

const validatorEnv = (env, name)=>{
    if(!env) throw new Error('The '+name+' is not defined')
    
    return env
}

const config ={
    development:{
        port: validatorEnv(PORT, 'PORT')
    },
    production:{
        port: validatorEnv(PORT, 'PORT')
    }
}

module.exports = config