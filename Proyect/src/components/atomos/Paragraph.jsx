function Paragraph({ texto, styles }) {
  return (
    <>
      <p className={`text-center ${styles}`}>{texto}</p>
    </>
  );
}

export default Paragraph;
