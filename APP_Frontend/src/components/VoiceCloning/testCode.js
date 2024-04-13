
async function handleFile(){
    if (uploadFile){
      try {
        const formData = new FormData();
        formData.append('file', uploadFile);

        // Note: to Server.
        await axios.post('/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        if (!openAlert){
          setAlertColor("green")
          setAlertMsg(" File Uploaded Successfully! ")
          setOpenAlert(true)
        }
        setShowInput(prev=>!prev)

      } catch (error) {
        console.error('Error uploading file:', error)
        // alert('Error uploading file. Please try again.')
        if (!openAlert){
          setAlertColor("red")
          setAlertMsg(" Error Uploading File! ")
          setOpenAlert(true)
        }
      } 

    }
    else {
      if (!openAlert){
        setAlertColor("red")
        setAlertMsg(" File Not Provided! ")
        setOpenAlert(true)
      }
      setInputFile(
      <div className='text-red-500 text-lg text-center'>
          File Not Provided !
      </div>)
    }
  }


  const sendRecording = async (blob, fileDate)=>{
    const formData = new FormData();
    formData.append('file', blob, `Voice_${fileDate}.mp3` );
    
    try{
    // Note: to Server.
    const response = await axios.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'audio/mpeg'
      }
    });

        setAlertColor("green")
        setAlertMsg(" File Upload Successfully ")
        setOpenAlert(true)

  }catch (error) {
    console.error('Error uploading file:', error)

    setAlertColor("red")
    setAlertMsg(" Error Uploading File! ")
    setOpenAlert(true)
  } 
  }