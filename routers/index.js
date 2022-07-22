const express = require("express");
const router = express.Router();
require("../databases/db");
const Blog = require('../databases/blogs');

router.get("/",(req,res)=>{
  res.render("home",{
    nav_home: 'active'
  });
});
router.get("/about",(req,res)=>{
  res.render("about",{
    nav_about: 'active'
  });
});
router.get("/new",(req,res)=>{
  res.render("new");
});
router.get('/edit/:id',async(req,res)=>{
  const blogs = await Blog.findById(req.params.id).lean();
  res.render('edit',{ blogs:blogs });
});
router.get("/blogs",async(req,res)=>{
  let blogs = await Blog.find().lean().sort({ date: 'desc' });
  res.render("blogs",{
    blogs: blogs,
    nav_blogs: 'active',
  });
});
router.get("/blog/:slug",async(req,res)=>{
  const blogs = await Blog.findOne({ slug:  req.params.slug }).lean();
  if(blogs==null) res.redirect('/');
  res.render('blog',{ blogs: blogs });
});

router.delete('/blog/:id',async(req,res)=>{
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/blogs');
});

router.post("/article",async(req,res,next)=>{
  req.blogs = new Blog();
  next();
}, saveBlog('new'));

router.put("/article/:id",async(req,res,next)=>{
  req.blogs = await Blog.findById(req.params.id);
  next();
}, saveBlog('edit'));

function saveBlog(path){
  return async(req,res)=>{
    let blogs = req.blogs;
    blogs.title= req.body.title;
    blogs.desc= req.body.desc;
    blogs.markdown= req.body.markdown;
  try {
    blogs = await blogs.save();
    res.redirect(`/blog/${blogs.slug}`);
  } catch (e) {
    res.render(`${path}`, { blogs: blogs})
    console.log(e)
  }
  }
}

module.exports = router;