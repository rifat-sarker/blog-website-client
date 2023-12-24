
import { useState } from "react";

const AddBlog = () => {
    const [selectedValue, setSelectedValue] = useState('');

        // Handler function for when the selection changes
        const handleSelectChange = (event) => {
          setSelectedValue(event.target.value);
          console.log(selectedValue);
        };

  const handleAddBlog = (event) => {
    event.preventDefault();
    const form = event.target;
    console.log(form.value);
    const title = form.title.value;
    const sdesc = form.sdesc.value;
    const ldesc = form.ldesc.value;
    const imageURL = form.imageURL.value;
    const date = form.date.value;
    const newBlog ={title,sdesc,ldesc,imageURL,date,selectedValue}
    console.log(newBlog);
    
  };
       


  return (
    <div className="p-24">
      <h2 className="text-5xl text-center my-4 font-extrabold">Add Blog</h2>
      <form className="mt-20" onSubmit={handleAddBlog}>
        <div className="md:flex items-center mb-8">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Title of Blog</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="title"
                placeholder="blog title"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          {/* category */}
          <div className="form-control md:w-1/2 ml-4">
            <label className="mt-3 " htmlFor="dropdown">Category</label>
            <select
              className="h-12 rounded-lg px-3"
              id="dropdown"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="">Category</option>
              <option value="travel">Travel</option>
              <option value="recipes">Recipes</option>
              <option value="motivation">Motivation</option>
              <option value="nutrition">Nutrition</option>
              <option value="fashion">Fashion</option>
              <option value="parenting">Parenting Tips</option>
              <option value="learning_trategies">Learning Strategies</option>
              <option value="software_development">Software Development</option>
            </select>
          </div>
        </div>

        <div className="md:flex mb-8">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Short description</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="sdesc"
                placeholder="short description"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="imageURL"
                placeholder="Image URL"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <div className="md:flex mb-8">
          <div className="form-control w-3/4">
            <label className="label">
              <span className="label-text"> Long description</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="ldesc"
                placeholder="long description"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <label className="input-group">
              <input
                type="date"
                name="date"
                placeholder="date"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        <input type="submit" value="Add Blog" className="btn btn-block" />
      </form>
    </div>
  );
};

export default AddBlog;
