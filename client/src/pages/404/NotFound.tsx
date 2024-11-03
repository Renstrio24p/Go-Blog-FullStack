export default function NotFound404() {
  return (
    <section className="w-full h-screen flex items-center justify-center  text-white">
      <div>
        <div className="flex items-center gap-2 text-[1.6em] font-semibold">
          <h1>404</h1>
          <p>|</p>
          <p>Page Not Found</p>
        </div>
        <p className="text-[1.2em] font-thin text-gray-300">
          The page you are looking for does not exist.
        </p>
      </div>
    </section>
  );
}
