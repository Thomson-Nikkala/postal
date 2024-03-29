const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// tell it to use the public directory as one where static files live
app.use(express.static(path.join(__dirname, 'public')))

// views is directory for all template files
app.set('views', path.join(__dirname, 'views'))

// using 'ejs' template engine and default extension is 'ejs'
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

// Set up a rule that says requests to '/postage' should be handled by the getPostage function below
app.get('/postage', getRate);

// Requests to calc should be handled by the getRate function
app.get('/calc', getRate);

// start the server listening
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
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
        case 'Stamped_Letter':
            if (weight <= 1.0) {
                result = 0.55;
            } else if (weight <= 2.0) {
                result = 0.70;
            } else if (weight <= 3.0) {
                result = 0.85;
            } else if (weight <= 3.5) {
                result = 1.00;
            } else if (weight <= 4.0) {
                result = 1.45;
            } else if (weight <= 5.0) {
                result = 1.6;
            } else if (weight <= 6.0) {
                result = 1.75;
            } else if (weight <= 7.0) {
                result = 1.9;
            } else if (weight <= 8.0) {
                result = 2.05;
            } else if (weight <= 9.0) {
                result = 2.2;
            } else if (weight <= 10.0) {
                result = 2.35;
            } else if (weight <= 11.0) {
                result = 2.5;
            } else if (weight <= 12.0) {
                result = 2.65;
            } else if (weight <= 13.0) {
                result = 2.8;
            }
            break;
        case 'Metered_Letter':
            if (weight <= 1.0) {
                result = 0.5;
            } else if (weight <= 2.0) {
                result = 0.65;
            } else if (weight <= 3.0) {
                result = 0.8;
            } else if (weight <= 3.5) {
                result = 0.95;
            } else if (weight <= 4.0) {
                result = 1.45;
            } else if (weight <= 5.0) {
                result = 1.6;
            } else if (weight <= 6.0) {
                result = 1.75;
            } else if (weight <= 7.0) {
                result = 1.9;
            } else if (weight <= 8.0) {
                result = 2.05;
            } else if (weight <= 9.0) {
                result = 2.2;
            } else if (weight <= 10.0) {
                result = 2.35;
            } else if (weight <= 11.0) {
                result = 2.5;
            } else if (weight <= 12.0) {
                result = 2.65;
            } else if (weight <= 13.0) {
                result = 2.8;
            }
            break;
        case 'Large_Flat_Envelope':
            if (weight <= 1.0) {
                result = 1.0;
            } else if (weight <= 2.0) {
                result = 1.15;
            } else if (weight <= 3.0) {
                result = 1.3;
            } else if (weight <= 4.0) {
                result = 1.45;
            } else if (weight <= 5.0) {
                result = 1.6;
            } else if (weight <= 6.0) {
                result = 1.75;
            } else if (weight <= 7.0) {
                result = 1.9;
            } else if (weight <= 8.0) {
                result = 2.05;
            } else if (weight <= 9.0) {
                result = 2.2;
            } else if (weight <= 10.0) {
                result = 2.35;
            } else if (weight <= 11.0) {
                result = 2.5;
            } else if (weight <= 12.0) {
                result = 2.65;
            } else if (weight <= 13.0) {
                result = 2.8;
            }
            break;
        case 'Retail_First_Class_Package':
            if (weight <= 4.0) {
                result = 3.6;
            } else if (weight <= 5.0) {
                result = 3.78;
            } else if (weight <= 6.0) {
                result = 3.96;
            } else if (weight <= 7.0) {
                result = 4.14;
            } else if (weight <= 8.0) {
                result = 4.32;
            } else if (weight <= 9.0) {
                result = 4.5;
            } else if (weight <= 10.0) {
                result = 4.68;
            } else if (weight <= 11.0) {
                result = 4.86;
            } else if (weight <= 12.0) {
                result = 5.04;
            } else if (weight <= 13.0) {
                result = 5.22;
            } else if (weight <= 16.0) {
                result = 8.68;
            } else if (weight <= 32.0) {
                result = 10.28;
            }
            break;
            // default:
            // not needed
    }

    if (result == 0) {
        // redirect to invalid "weight and type" combination message
        response.render('pages/postage_error');
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
