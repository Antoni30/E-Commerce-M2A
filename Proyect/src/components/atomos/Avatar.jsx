function Avatar({ dirImg, altImg, avatarName }) {
  return (
    <>
      <div className="w-44 h-44 border overflow-hidden rounded-full">
        <img src={dirImg} alt={altImg} className="w-full" />
      </div>
      {avatarName ? <h3>{avatarName}</h3> : null}
    </>
  );
}

export default Avatar;
