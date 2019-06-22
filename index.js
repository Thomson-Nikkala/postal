const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 5000;

// tell it to use the public directory as one where static files live
app.use(express.static(path.join(__dirname, 'public')))

// views is directory for all template files
app.set('views', path.join(__dirname, 'views'))

// using 'ejs' template engine and default extension is 'ejs'
app.set('view engine', 'ejs')

//res.render compiles your template, inserts locals, and creates html
app.get('/', (req, res) => res.render('pages/index'))

// Set up a rule that says requests to '/postage' should be handled by the getPostage function below
app.get('/postage', getRate);

// start the server listening
app.listen(port, function () {
    console.log('Node app is running on port', PORT);
});

//error handler
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// 404 handler
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

/******************************
Functions (should put in separate file later)
******************************/

function getRate(request, response) {
    const mail_type = request.query.mail_type;
    const mail_weight = Number(request.query.weight);
    computeRate(response, mail_type, mail_weight);
}

function computeRate(response, type, weight) {
    let result = 0;
    switch (type) {
        case 'Stamped Letter':
            if (weight <= 1.0) {
                response = 0.55;
            } else if (weight <= 2.0) {
                response = 0.70;
            } else if (weight <= 3.0) {
                response = 0.85;
            } else if (weight <= 3.5) {
                response = 1.00;
            } else if (weight <= 4.0) {
                response = 1.45;
            } else if (weight <= 5.0) {
                response = 1.6;
            } else if (weight <= 6.0) {
                response = 1.75;
            } else if (weight <= 7.0) {
                response = 1.9;
            } else if (weight <= 8.0) {
                response = 2.05;
            } else if (weight <= 9.0) {
                response = 2.2;
            } else if (weight <= 10.0) {
                response = 2.35;
            } else if (weight <= 11.0) {
                response = 2.5;
            } else if (weight <= 12.0) {
                response = 2.65;
            } else if (weight <= 13.0) {
                response = 2.8;
            }
            break;
        case 'Metered Letter':
            if (weight <= 1.0) {
                response = 0.5;
            } else if (weight <= 2.0) {
                response = 0.65;
            } else if (weight <= 3.0) {
                response = 0.8;
            } else if (weight <= 3.5) {
                response = 0.95;
            } else if (weight <= 4.0) {
                response = 1.45;
            } else if (weight <= 5.0) {
                response = 1.6;
            } else if (weight <= 6.0) {
                response = 1.75;
            } else if (weight <= 7.0) {
                response = 1.9;
            } else if (weight <= 8.0) {
                response = 2.05;
            } else if (weight <= 9.0) {
                response = 2.2;
            } else if (weight <= 10.0) {
                response = 2.35;
            } else if (weight <= 11.0) {
                response = 2.5;
            } else if (weight <= 12.0) {
                response = 2.65;
            } else if (weight <= 13.0) {
                response = 2.8;
            }
            break;
        case 'Large Envelope (Flat)':
            if (weight <= 1.0) {
                response = 1.0;
            } else if (weight <= 2.0) {
                response = 1.15;
            } else if (weight <= 3.0) {
                response = 1.3;
            } else if (weight <= 4.0) {
                response = 1.45;
            } else if (weight <= 5.0) {
                response = 1.6;
            } else if (weight <= 6.0) {
                response = 1.75;
            } else if (weight <= 7.0) {
                response = 1.9;
            } else if (weight <= 8.0) {
                response = 2.05;
            } else if (weight <= 9.0) {
                response = 2.2;
            } else if (weight <= 10.0) {
                response = 2.35;
            } else if (weight <= 11.0) {
                response = 2.5;
            } else if (weight <= 12.0) {
                response = 2.65;
            } else if (weight <= 13.0) {
                response = 2.8;
            }
            break;
        case 'Retail First-class Package':
            if (weight <= 4.0) {
                response = 3.6;
            } else if (weight <= 5.0) {
                response = 3.78;
            } else if (weight <= 6.0) {
                response = 3.96;
            } else if (weight <= 7.0) {
                response = 4.14;
            } else if (weight <= 8.0) {
                response = 4.32;
            } else if (weight <= 9.0) {
                response = 4.5;
            } else if (weight <= 10.0) {
                response = 4.68;
            } else if (weight <= 11.0) {
                response = 4.86;
            } else if (weight <= 12.0) {
                response = 5.04;
            } else if (weight <= 13.0) {
                response = 5.22;
            } else if (weight <= 16.0) {
                response = 8.68;
            } else if (weight <= 32.0) {
                response = 10.28;
            }
            break;
        default:
            // not needed
    }

    if (response == 0) {
        // redirect to invalid "weight and type" combination message
    }

    // Set up a JSON object of the values we want to pass along to the EJS result page
    const params = {
        type: type,
        weight: weight,
        result: result
    };

    // Render the response, using the EJS page "result.ejs" in the pages directory
    // Makes sure to pass it the parameters we need.
    response.render('pages/result', params);

}
