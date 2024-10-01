export const Container = (props) => {
  const { url, children } = props;
  return (
    <main className="h-screen pt-[6.5rem] max-md:h-[18rem] max-md:pt-[6.2rem]">
      {children}
      <div className="absolute bottom-0 right-0">
        <img
          src={url}
          className={`max-h-80 object-contain max-md:max-h-[50%]`}
        />
      </div>
    </main>
  );
};
