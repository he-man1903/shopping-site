const app=require('./index')


const port=7000||process.env.PORT;


app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });

app.listen(port,()=>{
    console.log(`port started at ${port}`)
})
