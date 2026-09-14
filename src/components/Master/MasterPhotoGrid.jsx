import React from 'react';

export default function MasterPhotoGrid({ profiles }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {profiles.map(({ name, image }) => (
        <figure key={name} className="rounded-2xl bg-white border border-stone-200 overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-72 object-contain bg-stone-100"
          />
          <figcaption className="p-5 text-center text-xl font-bold text-gray-900">
            {name}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
