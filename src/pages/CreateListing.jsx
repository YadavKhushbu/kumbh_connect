import React, { useState } from 'react'
import "../styles/CreateListing.scss"
import  {Navbar } from '../components/Navbar'
import { categories,types ,facilities} from '../data'
import { RemoveCircleOutline ,AddCircleOutline} from '@mui/icons-material'
import {IoIosImages} from "react-icons/io"
import { DragDropContext,Draggable,Droppable } from 'react-beautiful-dnd'
import variables from "../styles/variables.scss"
import { BiTrash } from 'react-icons/bi'
export const CreateListing = () => {

    const [photos,setPhotos] = useState([]);
    const handleUploadPhotos=(e)=>{
        const newPhotos = e.target.files
        setPhotos((prevPhotos)=>[...prevPhotos,...newPhotos])
    }
    const handleDragPhoto = (result)=>{
        if(!result.destination) return
        const items = Array.from(photos)
        const [reorderedItem] = items.splice(result.source.index,1)
        items.splice(result.destination.index,0,reorderedItem)

        setPhotos(items)
    }
    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) =>
          prevPhotos.filter((_, index) => index !== indexToRemove)
        );
      };
  return (
    <>
    <Navbar/>
    <div className='create-listing'>
        <h1>Publish Your Place</h1>

        <form>
            <div className='create-listing_step1'>
               <h2>Step1:Tell us about Your Place</h2>
               <hr/>
               <h3>Which of these categories best describe your place ?</h3>
               <div className='category-list'>
                {categories?.map((item,index)=>(
                    <div className='category' key={index}>
                        <div className='category_item'>
                           <div className='category_icon'>{item.icon}</div>
                           <p>{item.label}</p>
                        </div>
                    </div>
                ))}
              </div>

              <h3>What type of place guests will have ?</h3>
              <div className='type-list'>
                {types?.map((item,index)=>(
                    <div className='type' key={index}>
                        <div className='type_text'>
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                        </div>
                        <div className='type_icon'>{item.icon}</div>
                    </div>
                ))}
              </div>

              <h3>Where's Your Place Located?</h3>
              <div className='full'>
                <div className='location'>
                    <p>Street Address</p>
                    <input type='text' placeholder='Street Address' name='streetAddress' required/>
                    </div>
              </div>

              <div className='half'>
                <div className='location'>
                    <p>Apartment, Suite, etc.(if applicable)</p>
                    <input type='text' placeholder='Apt, Suite etc(if applicable)' name='aptSuite' required/>

                </div>
                <div className='location'>
                    <p>City</p>
                    <input type='text' placeholder='City' name='city' required/>

                </div>
              </div>
              <div className='half'>
                <div className='location'>
                    <p>Province</p>
                    <input type='text' placeholder='Province' name='province' required/>

                </div>
                <div className='location'>
                    <p>Country</p>
                    <input type='text' placeholder='Country' name='country' required/>

                </div>
              </div>

              <h3>Share Some Basic about your place</h3>
              <div className='basics'>
                <div className='basic'>
                    <p>Guests</p>
                    <div className='basic_count'>
                      <RemoveCircleOutline sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:variables.pinkred}, }}/>
                      <p>1</p>
                      <AddCircleOutline sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:variables.pinkred}, }}/>
                    </div>
                </div>
                <div className='basic'>
                    <p>BedRooms</p>
                    <div className='basic_count'>
                      <RemoveCircleOutline sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:variables.pinkred}, }}/>
                      <p>1</p>
                      <AddCircleOutline sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:variables.pinkred}, }}/>
                    </div>
                </div>
                <div className='basic'>
                    <p>Beds</p>
                    <div className='basic_count'>
                      <RemoveCircleOutline sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:variables.pinkred}, }}/>
                      <p>1</p>
                      <AddCircleOutline sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:variables.pinkred}, }}/>
                    </div>
                </div>
                <div className='basic'>
                    <p>BathRooms</p>
                    <div className='basic_count'>
                      <RemoveCircleOutline sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:variables.pinkred}, }}/>
                      <p>1</p>
                      <AddCircleOutline sx={{fontSize:"25px", cursor:"pointer","&:hover":{color:variables.pinkred}, }}/>
                    </div>
                </div>
              </div>
            </div>

            <div className='create-listing_step2'>
                <h2>Step2:make Your Place stand out</h2>
                <hr/>
                <h3>Tell guests what your place has to offer</h3>
                <div className='amenities'>
                    {facilities?.map((item,index)=>(
                        <div className='facility' key={index}>
                            <div className='facility_icon'>{item.icon}</div>
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>

                <h3>Add Some Photos Of your place</h3>
                <DragDropContext onDragEnd={handleDragPhoto}>
                    <Droppable droppableId='photos' direction='horizontal'>
                        {(provided)=>(
                            <div className='photos' {...provided.droppableProps} ref={provided.innerRef}>

                            {photos.length<1&&(
                                <>
                                <input id="image" type='file' style={{display:"none"}} accept='image/*' onChange={handleUploadPhotos} multiple/>
                                <label htmlFor='image' className='alone'>
                                    <div className='icon'><IoIosImages/></div>
                                    <p>Upload from your Device</p>
                                </label>
                                </>
                            )}

                            {photos.length>=1 && (
                                <>
                                {photos.map((photo,index)=>(
                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                        {(provided)=>(
                                            <div className='photo' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <img src={URL.createObjectURL(photo)} alt='place'/>
                                                <button type='button' onClick={()=>handleRemovePhoto(index)}>
                                                    <BiTrash></BiTrash>
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                 <input id="image" type='file' style={{display:"none"}} accept='image/*' onChange={handleUploadPhotos} multiple/>
                                <label htmlFor='image' className='together'>
                                    <div className='icon'><IoIosImages/></div>
                                    <p>Upload from your Device</p>
                                </label>
                                </>
                            )}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

            </div>
        </form>
    </div>
    </>
  )
}