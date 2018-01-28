
module.exports=function setEnv(){
process.env.POSTGRES_USERNAME=process.env.POSTGRES_USERNAME||'admin'
 process.env.POSTGRES_PASSWORD=process.env.POSTGRES_PASSWORD||'twittery-medellin-newlyweds-tamari'
 process.env.POSTGRES_HOSTNAME=process.env.POSTGRES_HOSTNAME||'localhost'
 process.env.POSTGRES_PORT=process.env.POSTGRES_PORT||'6432'
 process.env.CLUSETER_NAME=process.env.CLUSETER_NAME || 'imprudent32';
}