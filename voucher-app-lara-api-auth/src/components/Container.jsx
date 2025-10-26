const Container = ({ children, className }) => {
  return (
    <div className={`w-full md:w-[720px]  lg:w-[1000px] mx-auto p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
