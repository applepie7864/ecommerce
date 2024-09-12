import { model, models, Schema } from "mongoose"

const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    images: {type: [String]}
})

const ProductModel = models.Product || model('Product', ProductSchema);
export default ProductModel;