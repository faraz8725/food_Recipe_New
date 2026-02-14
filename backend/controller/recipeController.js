const Recipes=require("../models/recipeModel");
const getRecipes=async(req,res)=>{
const recipes=await Recipes.find();
return res.json(recipes);
}
const getRecipe=async(req,res)=>{
  const recipe=await Recipes.findById(req.params.id);
  return res.json(recipe);

}
const addRecipes=async(req,res)=>{
  const {title,instructions,ingredients,time}=req.body;
if(!title || !instructions || !ingredients || !time){
  return res.json({message:"All fields are required"});
}
const newRecipe=await Recipes.create({
 title,instructions,ingredients,time
})
return res.json(newRecipe)
}
const editRecipes=async(req,res)=>{
const {title,instructions,ingredients,time}=req.body;
let recipe=await Recipes.findById(req.params.id);
try {
    if(recipe){
      await Recipes.findByIdAndUpdate(req.params.id,req.body,{new:true});
      res.json({title,instructions,ingredients,time});
    }
  }
  catch(err){
    return res.status(404).json({message:"error"})
  }

}
const deleteRecipes=async(req,res)=>{
return res.json({message:"Deleted"});
}

module.exports={
  getRecipes,
  getRecipe,
  addRecipes,
  editRecipes,
  deleteRecipes
}