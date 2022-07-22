const mongoose = require("mongoose");
const {marked} = require("marked");
const slugify = require("slugify");
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const blogsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  desc: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  markdown: {
    type: String,
    require: true
  },
  slug: {
    type: String,
    require: true,
    unique: true
  },
  sanitizeHtml: {
    type: String,
    require: true
  }
});

blogsSchema.pre('validate', function(next){
  if(this.title){
    this.slug = slugify(this.title,{ lower: true, strict: true});
  }
  if(this.markdown){
    this.sanitizeHtml = dompurify.sanitize(marked(this.markdown));
  }
  next();
});

const Blog = mongoose.model('Blog', blogsSchema);

module.exports = Blog;