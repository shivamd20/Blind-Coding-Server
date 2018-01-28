
module.exports=function setEnv(){
process.env.POSTGRES_USERNAME=process.env.POSTGRES_USERNAME||'admin'
 process.env.POSTGRES_PASSWORD=process.env.POSTGRES_PASSWORD||'concordant-configurable-nonscheduled-loveliness'
 process.env.POSTGRES_HOSTNAME=process.env.POSTGRES_HOSTNAME||'localhost'
 process.env.POSTGRES_PORT=process.env.POSTGRES_PORT||'6432'
 process.env.CLUSETER_NAME=process.env.CLUSETER_NAME || 'calk49';
}