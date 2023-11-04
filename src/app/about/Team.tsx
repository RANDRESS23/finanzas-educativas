import Image from "next/image";

export default function Team() {
  return (
    <div className="w-full mt-10">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="text-center pb-12">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-dark">
            Mira Nuestro equipo
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full bg-gray-900 dark:bg-slate-800 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
            <div className="mb-8">
              <Image
                className="object-center object-cover rounded-full"
                width={100}
                height={100}
                src="https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2021/09/24/disaster-girl.jpeg"
                alt="photo"
              />
              {/* <Image
                className="object-center object-cover rounded-full"
                width={100}
                height={100}
                src="https://guia.itfip.edu.co/sgacampus/images/dynamic/foto/1/1005773423/1005773423.jpg?width=76&cut=1"
                alt="photo"
              /> */}
            </div>
            <div className="text-center">
              <p className="text-xl text-white font-bold mb-2">José Manuel</p>
              <p className="text-base text-gray-400 font-normal">
                Developer Frontend and Backend
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-900 dark:bg-slate-800 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
            <div className="mb-8">
              <Image
                className="object-center object-cover rounded-full"
                width={100}
                height={100}
                src="https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2021/09/24/disaster-girl.jpeg"
                alt="photo"
              />
            </div>
            <div className="text-center">
              <p className="text-xl text-white font-bold mb-2">Ricardo Rojas</p>
              <p className="text-base text-gray-400 font-normal">
                Developer Frontend and Backend
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-900 dark:bg-slate-800 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
            <div className="mb-8">
              <Image
                className="object-center object-cover rounded-full"
                width={100}
                height={76}
                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                alt="photo"
              />
            </div>
            <div className="text-center">
              <p className="text-xl text-white font-bold mb-2">Raúl Quimbaya</p>
              <p className="text-base text-gray-400 font-normal">
                Developer Frontend and Backend
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-900 dark:bg-slate-800 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
            <div className="mb-8">
              <Image
                className="object-center object-cover rounded-full"
                width={100}
                height={76}
                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                alt="photo"
              />
            </div>
            <div className="text-center">
              <p className="text-xl text-white font-bold mb-2">Dany Bailey</p>
              <p className="text-base text-gray-400 font-normal">
                Software Engineer
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-900 dark:bg-slate-800 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
            <div className="mb-8">
              <Image
                className="object-center object-cover rounded-full"
                width={100}
                height={76}
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                alt="photo"
              />
            </div>
            <div className="text-center">
              <p className="text-xl text-white font-bold mb-2">Lucy Carter</p>
              <p className="text-base text-gray-400 font-normal">
                Graphic Designer
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-900 dark:bg-slate-800 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
            <div className="mb-8">
              <Image
                className="object-center object-cover rounded-full"
                width={100}
                height={76}
                src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80"
                alt="photo"
              />
            </div>
            <div className="text-center">
              <p className="text-xl text-white font-bold mb-2">Jade Bradley</p>
              <p className="text-base text-gray-400 font-normal">Dev Ops</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
