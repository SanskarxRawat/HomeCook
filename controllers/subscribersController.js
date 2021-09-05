const Subscriber=require("../models/subscriber");

  module.exports={
    index:(req,res,next)=>{
      Subscriber.find()
      .then(subscribers=>{
        res.locals.subscribers=subscribers;
        next();
      })
      .catch(error=>{
        console.log(`Error fetching subscribers :${error.message}`);
        res.redirect("/");
      });
    },
    indexView:(req,res)=>{
      res.render("subscribers/index");
    },
    new:(req,res)=>{
      res.render("subscribers/new");
    },
    saveSubscriber:(req,res)=>{
      let newSubscriber=new  Subscriber({
        name:req.body.name,
        email:req.body.email,
        zipCode:req.body.zipCode
      });
      newSubscriber
      .save()
      .then(result=>{
        res.render("thanks");
      })
      .catch(error=>{
        if(error) res.send(error);
      });
    },
    create:(req,res,next)=>{
      Subscriber.create({
          name:req.body.name,
          email:req.body.email,
          zipCode:req.body.zipCode
      }).then(subscriber => {
        res.locals.redirect = '/subscribers';
        res.locals.subscriber = subscriber ;
        next();
      }).catch(error => {
          console.log(`Error creating subscriber : ${error.message}`);
          next(error);
      });
    },
    redirectView:(req,res,next)=>{
      let redirectPath=res.locals.redirect;
      if(redirectPath) res.redirect(redirectPath);
      else res.render('error');
    },
    show:(req,res,next)=>{
      let subscriberId=req.params.id;
      Subscriber.findById(subscriberId)
      .then(subscriber=>{
        res.locals.subscriber=subscriber;
        next();
      })
      .catch(error=>{
        console.log(`Error fetchig subscriber by ID: ${subscriberId}`)
        next(error);
      });
    },
    showView:(req,res)=>{
      res.render("subscribers/show");
    },
    edit:(req,res,next)=>{
      let  subscriberId=req.params.id;
      Subscriber.findById(subscriberId)
      .then((subscriber)=>{
        res.render("subscribers/edit",{
          subscriber:subscriber
        });
      })
      .catch(error=>{
        console.log(`Error fetching  subscriber by  Id:${error.message}`);
        next(error);
      });
    },
    update:(req,res,next)=>{
      let subscriberParams = {
        name : req.body.name,
        email : req.body.email, 
        zipCode : req.body.zipCode
    };
    let subscriberId = req.params.id;
    Subscriber.findByIdAndUpdate(subscriberId, {
        $set : subscriberParams
    }).then((subscriber) => {
        res.locals.redirect = `/subscribers/${subscriberId}`;
        res.locals.subscriber = subscriber;
        next();
    })
    .catch((error) => {
        console.log(`Error updating user by id : ${error.message}`);
        next(error);
    });
    },
    delete:(req,res,next)=>{
      let subscriberId=req.params.id;
      Subscriber.findByIdAndRemove(subscriberId)
      .then(()=>{
        res.locals.redirect="/subscribers";
        next();
      })
      .catch(error=>{
        console.log(`Error deleting subscriber by ID:${error.message}`);
        next(error);
      });
    }
  };