(function() {
    'use strict';
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname + '/public');
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: !0 }));
    app.use(express.static(__dirname + '/public'));
    var firebase = require('firebase');
    const admin = require('firebase-admin');
    admin.initializeApp({
        credential: admin.credential.cert({
            "type": "service_account",
            "project_id": "snapdealluckdrawwinner",
            "private_key_id": "392351c07e3dc4061d50646409a87f3eaabb74d9",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7bTupdkSg8x8d\nV77/eond7YFrfvop73CHM6XNEgJqLpYPoB5qPXKbqjE/69rE1m5c/9zMRuzWAN/G\n4/fOMbdsnWAgCUn0SDrVrn9mdaMpSa93bhOP7abe7LzBZxUtMgVnHET+WqEcW4jR\nBeI3/FWn4jmiI16/88bXU1uIct3f3yQA2PTTYLLfohOOuGCfylpK/VuV6jAZgiQN\ntLhmY9hi6XBBLGERCnSL+YZfRu4EwrBA9OC39D9aQuA5oI83WIS6wBUoOXldMKVB\n++4pOQ5sRYmL7cO45oErRK9KB3+/2U8DorlOI2G+JZ9rOwtxMkhfdx/Ri+wqnbFO\nRyRRWk5NAgMBAAECggEALPe9eYBIYXRLSgs4JkwUYVRfOXcG1sJdlXahCEVSon6o\nXrncKkGxamMoO02fWJwY8QOrSjCXGJYvmmSuGwDHIQ5WFoGcBnnA8e0SoHbHbXvC\nF02n8F+EqpYSiHVuuX/3l2BLNlpwrqDQf9PhTWzjcSrgCIRjcnruwVE81A05KgGS\noBvTdAf8r2jcRijK0kbHswVN+SQc2mpyKEItQTc/+UpmrEh213Dkgf74afpwkxNK\nu3Pp7qOTA7rp+uCUdb9tevEXHDs44d288KEpEddNMEdLy/atnwh3r/aMV0L2awLj\nF1ytqtYiu2WzY0vNA8v1afVtRKXmx+UGE1IpS1q0cQKBgQDdqZpFKXfUo3jG8vVF\nr+DRWNK9snfgQTvdTdKK6D4xS7L0ZW9H7H7MZrHoZGbtmk5xRhi0hreCIZn6HG6i\nc1DR86YIRAOf4Pu6UtrpTOfeCSvg4cHNSu9y6NKsexLMmNnV7Yipd83UowOVdHRz\n64lmD8yw8+v5tCd+5U1YRJ9s8QKBgQDYdfOqefeCalNd26LJnKcxpExHLRrbqIiQ\nTeLL0fIi3fqIh7rhx8jBria6B3JHQTIkz+ylm5j4Fr5J8OKQtgvjE+gek1xyNWkS\nxJnh8RLWAmgxj2blDukUL993y5ngd5aoW8jcAIWQJFIXjwmh5UmFrViC0SaUrs4+\n4DLMpdZnHQKBgQDJcYQAzLHZLgLqEwyyGydeObGzschdpgsokLwBfxReKmRk1PYv\n0A5f5ghSoUQlNLGLId/7195Xxf+wHDyzJ8dQNnQyWNVOa+F5MClAEqM51u3ofmJp\nFmvL6yjilSq9gz+cujUThgwp7UepgF8AphKFDWDBg7t1f7LREMScriiQkQKBgQCd\nGEWGJMxvttDYHk2vemSRD4dYZLDIWDD8YbpGaBEOIwHvUmpb8A2QGt76Res3MWa9\n9rTtn9ZNvtvNd+hGVAiefdUJU7NVI9QlDdAMfVRJQyfxR/zKIp8fynqpS3daxA/w\nEeTdXfeRG/sEJAg+mdRZEuxYzIfugksmsLnNclH/NQKBgDQmZWmXkUhpjx0+/uSt\n5upG6KjXxvSMnd7wsdF/iiNm6u4YJiJ+5N9m7G0PEQ0C8bBFoedemf7lpE69zghR\nVsKKNbGTO/WR2iK5syqKLuiAKbc8WNXgsE+TlBE5FLIpLzjtNldwHouJhov8wNjz\nQRBcTC7i5EhIU8gQdnFd2VNm\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-uqx04@snapdealluckdrawwinner.iam.gserviceaccount.com",
            "client_id": "101966223817254162987",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uqx04%40snapdealluckdrawwinner.iam.gserviceaccount.com"
          }
          )
    }); 
    const db = admin.firestore();

    app.get('/validate', (req,response)=>{
        var number = req.query.number;
        var json = req.query.json || 0;
        var outputList = [];
        var promise = new Promise((resolve, reject) => {
            return db.collection('snapdealscratch').where('number', '==', number).get().then(snapshot => {
                if (snapshot.empty) {
                    response.render ('pages/404');
                }
                snapshot.forEach(doc => {
                    let item = {};
                    item['id'] = doc.id;
                    item['info'] = doc.data();
                    outputList.push(item);
                });
                resolve(outputList);
            }).catch(err => {
                reject(err);
            });
        });

        promise.then(() => {
            if (json == 1) {
                response.send({
                    data: outputList
                })
            } else {
                response.render('pages/user-details', {
                    data: outputList
                });
            }
            
        });

    })
  
  

    // scratch process
    app.post('/page-one', function(req, res) {
        res.render('pages/pages-one.ejs');
    });
 
// other page routing
app.get('/product', function(req, res) {
    res.render('pages/product');
});
app.get('/prize', function(req, res) {
    res.render('pages/prize');
});
app.get('/how-to-win', function(req, res) {
    res.render('pages/how-to-win');
});
app.get('/winner-list', function(req, res) {
    res.render('pages/winner-list');
});
app.get('/check-status', function(req, res) {
    res.render('pages/check-status');
});
app.get('/terms-and-conditions', function(req, res) {
    res.render('pages/terms-and-conditions');
});
app.get('/signin', function(req, res) {
    res.render('pages/signin');
});
app.get('/contact', function(req, res) {
    res.render('pages/contact');
});


app.get('/winner-cash', function(req, res) {
    res.render('pages/winner-cash');
});
app.get('/final-prize', function(req, res) {
    res.render('pages/final-prize');
});
app.get('/scratch', function(req, res) {
    res.render('pages/scratch');
});
// other page routing

// index page routing
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });
  // index page routings
  

// port routing start
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
console.log(`App listening on port ${PORT}`);
console.log('Press Ctrl+C to quit.')
});
// port routing end
})();