const CartIllustration = () => {
  return (
    <div className="inline-flex max-w-[176px] gap-1 items-center px-1.5 w-44 h-12 rounded-md border">
      <div className="h-[34px] w-[34px] border rounded bg-light-slate-5"></div>
      <div className="w-[80px]  gap-2  rounded">
        <div className="border w-full h-3 bg-light-slate-5 rounded"></div>
        <div className="flex w-4/5 h-2  gap-1 mt-1">
          <div className="bg-light-slate-5 w-2 rounded-sm h-full"></div>
          <div className="bg-light-slate-5 flex-1 rounded-sm h-full"></div>
          <div className="bg-light-slate-5 w-2 rounded-sm h-full"></div>
          <div className="bg-light-slate-5 flex-1 rounded-sm h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CartIllustration;
