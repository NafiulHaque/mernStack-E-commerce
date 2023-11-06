import asyncHandler from 'express-async-handler'
import Product from '../Models/productModel.js'

// @des get all products
// @route GET /api/products
// @access public

const getAllProducts=asyncHandler(async(req,res)=>{

    const keyword=req.query.keyword?{
        name:{
            $regex:req.query.keyword,
            $options:'i'


    }
    }:{}

    const ALLProducts=await Product.find({...keyword})

    res.json(ALLProducts)
   
    
})

// @des get product by id
// @route GET /api/products/:id
// @access public
const productById=asyncHandler(async(req,res)=>{
    const productById=await Product.findById(req.params.id)
    if(productById){
     res.json(productById)   
    }else{
        res.status(404).json({message:"product not found"})
    }
    
    
})

//@des delete product
//@route DELETE /api/products/:id
//@access private/admin
const deleteProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.json({message:"product removed"})
    }else{
        res.status(404).json({message:"product not found"})
    }

})

//@des create product
//@route POST /api/products
//@access private/admin
const createProduct=asyncHandler(async(req,res)=>{

    const product=new Product({
        name:'sample name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews:0,
        description:'sample description'
    })
    const createdProduct=await product.save()
    res.status(201).json(createdProduct)
}

)

//@des update product
//@route PUT /api/products/:id
//@access private/admin
const updateProduct=asyncHandler(async(req,res)=>{
    const {name,price,image,brand,category,countInStock,description}=req.body
    const product=await Product.findById(req.params.id)
    if(product){
        product.name=name
        product.price=price
        product.image=image
        product.brand=brand
        product.category=category
        product.countInStock=countInStock
        product.description=description
        const updatedProduct=await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404).json({message:"product not found"})
    }

})

//@des create new review
//@route POST /api/products/:id/reviews
//@access private

const createProductReview=asyncHandler(async(req,res)=>{
    const {rating,comment}=req.body

    const product=await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed=product.reviews.find(r=>r.user.toString()===req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error('product already reviewed')
        }
        const review={
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }
        product.reviews.push(review)
        product.numReviews=product.reviews.length
        product.rating=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length
        await product.save()
        res.status(201).json({message:'review added'})
    }else{
        res.status(404)
        throw new Error('product not found')
    }

})

export {getAllProducts,productById,deleteProduct,createProduct,updateProduct,createProductReview}





