import React from 'react';
import { useState } from 'react';
import { preview } from '../assets';
import { useNavigate } from 'react-router-dom';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';


const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: '',
    prompt: '',
    photo: ''
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setloading] = useState(false);

  
  const generateImage = async () => {
  if (!form.prompt) {
    alert('Please enter a prompt');
    return;
  }

  try {
    setGeneratingImg(true);

    const response = await fetch('https://image-generation-kwo4.onrender.com/api/v1/dalle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: form.prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate image');
    }

    
    setform({
      ...form,
      photo: data.photo,   
    });

  } catch (err) {
    console.error('generateImage error:', err);
    alert(err.message || 'Error generating image');
  } finally {
    setGeneratingImg(false);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(form.prompt && form.photo){
      setloading(true);
      try {
        const response = await fetch('https://image-generation-kwo4.onrender.com/api/v1/post',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(form)
        })
        await response.json();
        navigate('/')
      } catch (error) {
          alert(error);

      }finally{
        setloading(false);
      }
    }
    else{
      alert("Please enter a prompt and generate the image")
      
    }



  }
  const handleChange = (e) => {
    setform({...form,[e.target.name]:e.target.value})

  }
  const handleSurpriseMe = () => {
    const randomprompt = getRandomPrompt(form.prompt)
    setform({...form,prompt:randomprompt})

  }
  
  return (
    <section className='max-w-7x1 mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          Create
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>
          Create imaginative and visually stunning images through DALL-E AI and share them with the community
        </p>

      </div>
      <form className='mt-16 max-w-3x1' onSubmit={handleSubmit} >
        <div className='flex flex-col gap-5'>
          <FormField
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}>
          </FormField>
          <FormField
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}>
          </FormField>
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus
            :border-blue-500 w-64 p-3 h-64 flex justify-center items-center '>
            {form.photo ? (<img src={form.photo} alt={form.prompt} className='w-full h-full object-contain'></img>) : (
              <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40'></img>
            )}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader></Loader>
              </div>
            )}
          </div>
          </div>
          <div className='mt-5 flex gap-5'>
            <button 
            type="button"
            onClick={generateImage}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
              {generatingImg?'Generating...' : 'Generate'}

            </button>
          </div>
          <div>
            <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want,you can share it with others in the community</p>
            <button type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
              {loading?'Sharing...':'Share with Community'}
            </button>
          </div>
          </form>
    </section>
  )
}

export default CreatePost