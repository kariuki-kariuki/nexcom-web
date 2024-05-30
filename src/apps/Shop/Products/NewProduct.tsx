import { Input, Textarea } from "@mantine/core";
import { useState } from "react";

type productColor = {
  name: string;
  image: string;
};

type Product = {
  name: string;
  description: string;
  image: string;
  colors: productColor[];
  quantity: number;
  sizes: string[];
};

function NewProduct() {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    image: "",
    colors: [],
    quantity: 0,
    sizes: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sizes = e.target.value.split(",").map(size => size.trim());
    setProduct((prevProduct) => ({
      ...prevProduct,
      sizes,
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      quantity: parseInt(e.target.value),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null ) {
        let file = e.target.files[0]; 
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleColorChange = (index: number, field: string, value: string) => {
    const updatedColors = [...product.colors];
    updatedColors[index] = { ...updatedColors[index], [field]: value };
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: updatedColors,
    }));
  };

  const addColor = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: [...prevProduct.colors, { name: "", image: "" }],
    }));
  };

  return (
    <div className="container mx-auto p-6 bg-slate-900 shadow-md h-full overflow-scroll rounded-md flex justify-center">
      <form className="w-3/6 border h-full overflow-scroll p-3 bg-slate-800 rounded-lg">
        <header className="font-sans font-black font-xs">New Product</header>
        <div className="mb-4">
          <label htmlFor="name" className="block text-white-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <Input
            type="text"
            required
            id="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-white-700 text-sm font-bold mb-2">
            Description
          </label>
          <Textarea
            id="description"
            required
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-white-700 text-sm font-bold mb-2">
            Product Image
          </label>
          <input
            type="file"
            required
            id="image"
            onChange={handleImageChange}
            className="w-full border rounded"
          />
          {product.image && (
            <img src={product.image} alt="Product" className="mt-4 max-w-full h-20 rounded-md shadow-md" />
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-white-700 text-sm font-bold mb-2">
            Quantity
          </label>
          <Input
            type="number"
            required
            id="quantity"
            value={product.quantity}
            onChange={handleQuantityChange}
            className="w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="sizes" className="block text-white-700 text-sm font-bold mb-2">
            Sizes (comma separated)
          </label>
          <Input
            type="text"
            id="sizes"
            required
            value={product.sizes.join(", ")}
            onChange={handleSizeChange}
            className="w-full  border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white-700 text-sm font-bold mb-2">
            Colors
          </label>
          {product.colors.map((color, index) => (
            <div key={index} className="mb-2">
              <Input
                type="text"
                placeholder="Color Name"
                required
                value={color.name}
                onChange={(e) => handleColorChange(index, "name", e.target.value)}
                className="w-full border rounded mb-1"
              /> <br />
              <Input
                type="file"
                required
                onChange={(e:  React.ChangeEvent<HTMLInputElement>) => handleColorChange(index, "image", URL.createObjectURL(e.target.files[0]))}
                className="w-full border rounded"
              />
              {color.image && (
                <img src={color.image} alt="Color" className="mt-2 max-w-full h-auto rounded-md shadow-md" width={20} height={20}/>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addColor}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Color
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewProduct;
