const express = require('express');
// const employee = require('../models/employee');
const router = express.Router();

const Employee = require('../models/employee');


//get routes are here
router.get('/',(req,res)=>{
    Employee.find({})
    .then(employees =>{
        res.render('index', {employees : employees});
    })
    .catch(err=>{
        req.flash('error_msg','ERROR : ' + err);
        res.redirect('/');
    })
    
});

router.get('/employee/new',(req,res)=>{

    res.render('new');
});

router.get('/employee/search',(req,res)=>{
    res.render('search',{employee:""});
});

router.get('/employee',(req,res)=>{
    let searchQuery = {name : req.query.name};

    Employee.findOne(searchQuery)
    .then(employee => {
        res.render('search',{employee:employee});
    })
    .catch(err=>{
        req.flash('error_msg','ERROR : ' + err);
        res.redirect('/');
    });
});

router.get('/edit/:id', (req, res)=>{

    let searchQuery = {_id : req.params.id};
    Employee.findOne(searchQuery)
        .then(employee => {
            res.render('edit', {employee:employee});

        })
        .catch(err =>{
            req.flash('error_msg','ERROR : ' + err);
            res.redirect('/');
        });
});
//get routes ends here

//post routes are here
router.post('/employee/new',(req,res)=>{
    let newEmployee = {
        name : req.body.name,
        designation : req.body.designation,
        salary : req.body.salary
    };
    Employee.create(newEmployee)
    .then(employee=>{
        req.flash('success_msg','Employee data added to database successfully.');
        res.redirect('/');
    })
    .catch(err =>{
        req.flash('error_msg','ERROR : ' + err);
        res.redirect('/');
    });

});
//post routes are ends here

//put routes are here

router.put('/edit/:id',(req, res)=>{
    let searchQuery = {_id : req.params.id};

    Employee.updateOne(searchQuery, {$set:{
        name : req.body.name,
        designation : req.body.designation,
        salary : req.body.salary 
    }})
    .then(employee => {
        req.flash('success_msg','Employee data updated successfully.');
        res.redirect('/');
    })
    .catch(err => {
        req.flash('error_msg','ERROR : ' + err);
        res.redirect('/');
    });
});
//put routes are end here

//delete routes starts here
router.delete('/delete/:id',(req,res)=>{
    let searchQuery = {_id : req.params.id};
    
    Employee.deleteOne(searchQuery)
    .then(employee=>{
        req.flash('success_msg','Employee deleted successfully.');
        res.redirect('/');
    })
    .catch(err=>{
        req.flash('error_msg','ERROR : ' + err);
        res.redirect('/');
    });
});

//delete routes ends here

module.exports = router;