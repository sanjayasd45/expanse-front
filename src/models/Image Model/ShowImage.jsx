

export default function ShowImage({id}) {
    console.log(id);
    const url = `https://drive.google.com/uc?export=view&id=${id}`;
    console.log(url);
    
  return (
    <div>
    <h1>Image</h1>
    {/* 1bChtkeG7XSa4oSj3eKfu9OmUwxwN3t1m */}
      <img
        src={"https://drive.google.com/uc?export=view&id=1bChtkeG7XSa4oSj3eKfu9OmUwxwN3t1m"}
        alt="Image"
        style={{ width: "300px", border: "1px solid white" }}
      />
      <iframe src={`https://drive.google.com/file/d/${id}/preview`} width="640" height="480"></iframe>
    </div>
  )
}
