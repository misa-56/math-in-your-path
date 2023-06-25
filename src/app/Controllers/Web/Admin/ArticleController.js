const Article = require('../../../Models/Article');

class ArticleController {

  async create (req, res)
  {
    try{
      res.render('partials/admin/main/articles/create', {layout: 'admin.hbs'});
    }
    catch (error){
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async store (req, res)
  {
    
    try{
      if(req.body.category && req.body.status && req.body.title) {
        const { category, status, title, content, intro, featured, bg_image } = req.body;
        
        await Article.create({ 
          category, 
          status, 
          title,
          content,
          intro,
          featured,
          bg_image,
          user_id: req.session.user.id
        });

        res.redirect('/kingslanding');

      }
      else{
        res.send('Not added to db');
      }
    }
    catch(error){
      console.error(error);
    }
  }

  async edit (req, res)
  {
    let categories;
    try {
      const articles = await Article.findOne({where: {id: req.params.id}});
      await Article.findAll({group: ['category'], 
      attributes: ['category'],
    })
      .then((results) => {
        categories = results.map((result) => result.category);
        console.log('categories', categories);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(categories);
      if (articles === null) {
        // Handle the case when no article is found
        return res.status(404).send('Article not found');
      }
      articles.dataValues.createdAt = articles.dataValues.createdAt.toISOString().split('T')[0];

      res.render('partials/admin/main/articles/edit', {layout: 'admin.hbs', article: articles.dataValues, categories });
    } catch (error) {
      console.error(error);
    }
  }

  async update (req, res)
  {
    try {
      const article = await Article.findByPk(req.params.id);
      await article.update(req.body);
      await Article.update({content: `<p>In this article, we will explore how to build a Bitcoin Tracker application using Socket.IO and Express.js while following the Model-View-Controller (MVC) architectural pattern. By leveraging the power of real-time communication with Socket.IO and the flexibility of Express.js, we can create a dynamic application that tracks Bitcoin prices and updates them in real-time.</p>
      <div class="m-5">
      <p>Current Bitcoin Price: <span id="price"></span></p>
        <div class="d-flex">
          <input type="number" class="form-control w-50" id="alertInput" placeholder="Enter alert threshold" />
          <button class="btn btn-danger" onclick="setAlertThreshold()">Set Alert</button>
        </div>
      </div>
      <p><i>Step 1: Setting up the Environment</i></p><p>To begin, let's set up our development environment by installing the necessary packages. Open your terminal and run the following command to install Socket.IO and Express.js:</p><blockquote><h4>npm install socket.io express</h4></blockquote><p><i>Step 2: Initializing the Application&nbsp;</i></p><p>Create a new file called <strong>app.js</strong> and add the following code to initialize our Express.js app and configure Socket.IO to listen on the same server:</p><blockquote><h4><i>const express = require('express');&nbsp;</i></h4><h4><i>const app = express();&nbsp;</i></h4><h4><i>const server = require('http').createServer(app);&nbsp;</i></h4><h4><i>const io = require('socket.io')(server);&nbsp;</i></h4><h4><i>server.listen(3000);</i></h4></blockquote><p><i>Step 3: Handling Socket.IO Events with Controllers&nbsp;</i></p><p>Create a new file called <strong>BitcoinTrackerController.js</strong> to handle Bitcoin-related functionality. Here's an example of the code:</p><blockquote><h4>const axios = require('axios');</h4><h4>class BitcoinTrackerController {<br>&nbsp;handleSocketConnection(socket) {<br>&nbsp; &nbsp;console.log('A user connected.');</h4><h4>&nbsp; &nbsp;const getPriceUpdates = async () =&gt; {<br>&nbsp; &nbsp; &nbsp;try {<br>&nbsp; &nbsp; &nbsp; &nbsp;while (true) {<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;const response = await axios.get(<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'https://api.coincap.io/v2/assets/bitcoin'<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;);<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;const bitcoinPrice = parseFloat(response.data.data.priceUsd).toFixed(2);<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;socket.emit('bitcoinData', bitcoinPrice);<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;await new Promise((resolve) =&gt; setTimeout(resolve, 3000)); // Delay for 3 seconds<br>&nbsp; &nbsp; &nbsp; &nbsp;}<br>&nbsp; &nbsp; &nbsp;} catch (error) {<br>&nbsp; &nbsp; &nbsp; &nbsp;console.error('Error fetching Bitcoin price:', error);<br>&nbsp; &nbsp; &nbsp;}<br>&nbsp; &nbsp;};</h4><h4>&nbsp; &nbsp;getPriceUpdates();</h4><h4>&nbsp; &nbsp;socket.on('disconnect', () =&gt; {<br>&nbsp; &nbsp; &nbsp;console.log('A user disconnected.');<br>&nbsp; &nbsp;});</h4><h4>&nbsp; &nbsp;socket.on('setAlertThreshold', (threshold) =&gt; {<br>&nbsp; &nbsp; &nbsp;const alertThreshold = parseFloat(threshold);<br>&nbsp; &nbsp; &nbsp;if (alertThreshold &gt; 0 &amp;&amp; bitcoinPrice &lt; alertThreshold) {<br>&nbsp; &nbsp; &nbsp; &nbsp;alert('Bitcoin price is lower than the threshold!');<br>&nbsp; &nbsp; &nbsp;}<br>&nbsp; &nbsp;});<br>&nbsp;}<br>}</h4><h4>module.exports = BitcoinTrackerController;</h4></blockquote><p><i>Step 4: Connecting Socket.IO and MVC&nbsp;</i></p><p>In the <strong>app.js</strong> file, we'll load the <strong>BitcoinTrackerController.js</strong> file and pass the <strong>io</strong> object to it, allowing it to register event handlers:</p><blockquote><h4>const express = require('express');<br>const app = express();<br>const server = require('http').createServer(app);<br>const io = require('socket.io')(server);</h4><h4>// Load BitcoinTrackerController<br>const BitcoinTrackerController = require('./BitcoinTrackerController');<br>const bitcoinTrackerController = new BitcoinTrackerController();</h4><h4>// Connect Socket.IO and MVC<br>io.on('connection', bitcoinTrackerController.handleSocketConnection);</h4><h4>server.listen(3000);<br>&nbsp;</h4></blockquote>
      <p>Conclusion: By following these steps, we've successfully connected Socket.IO with Node.js using the MVC model. Our Bitcoin Tracker application now tracks Bitcoin prices in real-time and provides users with the ability to set alert thresholds. The MVC architecture helps maintain a structured codebase, separating concerns and enhancing scalability.</p><p>Feel free to explore further and add more features to your application based on these foundations. Happy coding!</p>
      <script src="/socket.io/socket.io.js"></script>
      <script>
          const socket = io();
          let previousPrice = 0; // Store the previous price
          let alertThreshold = null; // Store the alert threshold
      
          function setAlertThreshold() {
            const inputElement = document.getElementById('alertInput');
            alertThreshold = inputElement.value;
            inputElement.value = ''; // Clear the input field after setting the threshold
            inputElement.placeholder = 'Alert threshold: \${alertThreshold}';
          }
      
          socket.on('bitcoinData', (bitcoinPrice) => {
            const priceElement = document.getElementById('price');
      
            // Convert bitcoinPrice to a number with two decimal places
            const formattedPrice = Number(bitcoinPrice).toFixed(2);
      
            if (previousPrice !== null) {
              // Compare with the previous price
              if (formattedPrice > previousPrice) {
                priceElement.style.color = 'green'; // Set text color to green if the value is up
              } else if (formattedPrice < previousPrice) {
                priceElement.style.color = 'red'; // Set text color to red if the value is down
              }
            }
      
            if (alertThreshold !== null && formattedPrice < alertThreshold) {
              // Display an alert if the bitcoinPrice is lower than the alert threshold
              alert('Bitcoin price is lower than \${alertThreshold}!');
              alertThreshold = null; // Reset the alert threshold
              document.getElementById('alertInput').placeholder = 'Enter alert threshold'; // Reset the input field placeholder
            }
      
            priceElement.textContent = '$\${formattedPrice}';
            previousPrice = formattedPrice; // Update the previous price
          });
      </script>`},
      {where: {id: 16}});
      res.redirect('/kingslanding');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new ArticleController;