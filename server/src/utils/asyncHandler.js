const asyncHandler = (functionToExecute)=>{

  return (req,res,next)=>{

    Promise
      .resolve(functionToExecute(req,res,next))
      .catch(next);

  };

};


export default asyncHandler;