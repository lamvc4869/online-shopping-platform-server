import Product from "../../models/product.model.js";

const increaseSoldOfProducts = async (orderProducts) => {
    for (const item of orderProducts) {
        await Product.findByIdAndUpdate(
            item.productId,
            {
                $inc: { sold: item.quantity },
            },
            { new: true }
        );
    }
};

const decreaseSoldOfProducts = async (orderProducts) => {
    for (const item of orderProducts) {
        await Product.findByIdAndUpdate(
            item.productId,
            {
                $inc: { sold: -item.quantity },
            },
            { new: true }
        );
    }
};

export { increaseSoldOfProducts, decreaseSoldOfProducts };