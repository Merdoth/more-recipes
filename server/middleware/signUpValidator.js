export default function(req, res, next) {
    const{ userName, email, password } = req.body;

        if( !userName || userName == '' ) {
            return res.status(400).send({message: 'Please enter a valid userName!'})
        }
        if( !email || email == '' ) {
            return res.status(400).send({message: 'Please enter a valid email!'})
        }
        if( !password || password == '' ) {
            return res.status(400).send({message: 'Please enter a valid password!'})
        }
    next();    

}