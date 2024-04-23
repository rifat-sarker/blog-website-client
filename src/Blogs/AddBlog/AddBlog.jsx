
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const AddBlog = () => {
    const [category, setCategory] = useState('');

        // Handler function for when the selection changes
        const handleSelectChange = (event) => {
          setCategory(event.target.value);
          console.log(category);
        };

  const handleAddBlog = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const sdesc = form.sdesc.value;
    const ldesc = form.ldesc.value;
    const imageURL = form.imageURL.value;
    const date = form.date.value;
    const newBlog ={title,sdesc,ldesc,imageURL,date,category}
    console.log(newBlog);


    //send data to the server
    axios.post('https://blog-website-server-blond.vercel.app/blog', newBlog)
    .then(data => {
      if(data.data.insertedId){
        console.log(data.data);
        console.log('data added to the database');
        Swal.fire({
          title: 'Success!',
          text: 'New Blog added successfully',
          icon: 'success',
          confirmButtonText: 'ok'
        })
        form.reset();
      }
    })
    
  };
       


  return (
    <div className="p-24">
      <h2 className="text-5xl text-center my-4 font-extrabold">Add Blog</h2>
      <form className="mt-20" onSubmit={handleAddBlog}>
        <div className="lg:flex my-6 gap-6 ">
          <div className="form-control lg:w-1/2">
            <label className="label">
              <span className="label-text">Title of Blog</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="title"
                placeholder="blog title"
                className="border px-6 py-2 bg-slate-100 rounded-lg w-full"
              />
            </label>
          </div>
          {/* category */}
          <div className="form-control lg:w-1/2 ">
            <label className="label" htmlFor="dropdown"><span className="label-text">Category</span></label>
            <select
              className="border bg-slate-100  rounded-lg px-6 py-2"
              id="dropdown"
              value={category}
              onChange={handleSelectChange}
            >
              <option value="">Category</option>
              <option value="travel">Travel</option>
              <option value="parenting">Parenting Tips</option>
              <option value="recipes">Recipes</option>
              <option value="fashion">Fashion</option>
              <option value="motivation">Motivation</option>
              <option value="nutrition">Nutrition</option>
              <option value="learning_trategies">Learning Strategies</option>
              <option value="software_development">Software Development</option>
            </select>
          </div>
        </div>

        
        <div className="my-6 gap-6 lg:flex">
          <div className="form-control lg:w-1/2">
            <label className="label">
              <span className="label-text">Short description</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="sdesc"
                placeholder="short description"
                className=" border px-6 py-2 bg-slate-100 rounded-lg w-full"
              />
            </label>
          </div>
          <div className="form-control lg:w-1/2">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="imageURL"
                placeholder="Image URL"
                className=" border px-6 py-2 bg-slate-100 rounded-lg w-full"
              />
            </label>
          </div>
        </div>

        <div className="lg:flex my-6 gap-6">
          <div className="form-control lg:w-1/2">
            <label className="label">
              <span className="label-text"> Long description</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="ldesc"
                placeholder="long description"
                className=" border px-6 py-2 bg-slate-100 rounded-lg w-full"
              />
            </label>
          </div>
          <div className="form-control lg:w-1/2">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <label className="input-group">
              <input
                type="date"
                name="date"
                placeholder="date"
                className=" border px-6 py-2 bg-slate-100 rounded-lg w-full"
              />
            </label>
          </div>
        </div>
        <div className=" flex justify-center "><input type="submit" value="Add Blog" className="w-1/2 rounded-md bg-[#d1d1d1] hover:bg-[#8dcc78] px-6 py-3 mt-5 font-semibold" /></div>
      </form>
    </div>
  );
};

export default AddBlog;
