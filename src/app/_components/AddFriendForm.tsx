'use client'

import { useState, useRef } from "react";
import { db } from "../../../db";

export function AddFriendForm({ defaultAge } = { defaultAge: 21 }) {
   const [name, setName] = useState('');
   const [age, setAge] = useState(defaultAge);
   const [status, setStatus] = useState('');
   const [image, setImage] = useState<Blob | null>(null);
   const canvasRef = useRef<HTMLCanvasElement>(null);
 
   async function addFriend() {
     try {
       // Add the new friend!
       let id;
       if (image !== null) {
          id = await db.friends.add({
            name,
            age,
            image,
          });
       }
 
       setStatus(`Friend ${name} successfully added. Got id ${id}`);
       setName('');
       setAge(defaultAge);
     } catch (error) {
       setStatus(`Failed to add ${name}: ${error}`);
     }
   }
 
   return (
     <>
       <p>{status}</p>
       Name:
       <input
         type="text"
         value={name}
         onChange={(ev) => setName(ev.target.value)}
         className="text-black"
       />
       Age:
       <input
         type="number"
         value={age}
         onChange={(ev) => setAge(Number(ev.target.value))}
         className="text-black"
       />
       Image: 
       <input type="file" onChange={(ev) => {
         console.log('ev',ev)
         const file = ev.target?.files !== null ? ev.target?.files[0] : null;
         console.log('file',file)
         if (file) {
            // Create a URL for the image file
            const imageUrl = URL.createObjectURL(file);
            console.log('imageUrl: ', imageUrl)
            const canvas = canvasRef.current;
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = function() {
                // Draw the image on the canvas
                if (canvas !== null) {
                   canvas.width = img.width;
                   canvas.height = img.height;
                   const ctx = canvas.getContext('2d');
                   if (ctx !== null) {
                      ctx.drawImage(img, 0, 0);
                      // Convert canvas to Blob
                      canvas.toBlob(function(blob) {
                          // Do something with the blob
                          console.log(blob);
                          setImage(blob)
                          // You can also create a URL for the blob
                          if (blob !== null) {
                             const blobUrl = URL.createObjectURL(blob);
                             console.log(blobUrl);
                          }
                      }, 'image/png'); // Specify the desired format (e.g., 'image/png')
                   }
                }
            };
            // Set the preview image src to the file URL and make it visible
            // imagePreview.src = imageUrl;
            // imagePreview.style.display = 'block';
          }
       }} />
       <canvas id="canvas" className="hidden" ref={canvasRef}></canvas>
       <button onClick={addFriend}>Add</button>
     </>
   );
 }