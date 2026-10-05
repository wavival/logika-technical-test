import React, { useMemo, useState } from 'react';
import more from '@/assets/icons/more.svg';

const MAX_DESC = 200;
const HEX_REGEX = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

const ActionForm = ({
  loading = false,
  onSubmit,
  initialValues = {
    name: '',
    description: '',
    logo: null,
    color: '',
    active: true,
  },
  onCancel,
}) => {
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [logo, setLogo] = useState(initialValues.logo);
  const [color, setColor] = useState(initialValues.color);
  const [active, setActive] = useState(initialValues.active);

  const errors = useMemo(() => {
    const e = {};
    if (!name.trim()) e.name = 'Requerido';
    if (!description.trim()) e.description = 'Requerido';
    if (description.length > MAX_DESC)
      e.description = `Máximo ${MAX_DESC} caracteres`;
    if (!logo) e.logo = 'Requerido';
    if (!color.trim()) e.color = 'Requerido';
    else if (!HEX_REGEX.test(color.trim())) e.color = 'Formato HEX inválido';
    return e;
  }, [name, description, logo, color]);

  const isValid = Object.keys(errors).length === 0;

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) setLogo(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || loading) return;
    onSubmit?.({
      name: name.trim(),
      description: description.trim(),
      logo,
      color: color.trim(),
      active,
    });
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else window.history.back();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <section>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Nombre de la categoría*
        </label>
        <input
          type="text"
          placeholder="Escribe el nombre de la buena acción"
          className="w-full rounded-md border cursor-pointer border-slate-300 px-3 py-2 outline-none focus:border-slate-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-rose-600">{errors.name}</p>
        )}
      </section>

      <section>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Descripción de la buena acción*
        </label>
        <div className="relative">
          <textarea
            rows={4}
            placeholder="Agregar descripción"
            className="w-full rounded-md border border-slate-300 px-3 py-2 pr-14 outline-none focus:border-slate-400 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESC))}
          />
          <span className="pointer-events-none absolute right-2 bottom-2 text-xs text-slate-500">
            {description.length}/{MAX_DESC}
          </span>
        </div>
        {errors.description && (
          <p className="mt-1 text-xs text-rose-600">{errors.description}</p>
        )}
      </section>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Logo*
          </label>
          <label className="flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 cursor-pointer hover:bg-slate-50">
            <input
              type="file"
              className="hidden h-[50px]"
              accept="image/*"
              onChange={handleFile}
            />
            <img src={more} alt="upload icon" className="h-5 w-5" />
            <span
              className={`text-sm ${logo ? 'text-slate-900' : 'text-slate-400'}`}
            >
              {logo ? logo.name : 'Carga archivo'}
            </span>
          </label>
          {errors.logo && (
            <p className="mt-1 text-xs text-rose-600">{errors.logo}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Color*
          </label>
          <input
            type="color"
            placeholder="Registra color código HEX"
            className="w-full h-[40px] rounded-md border border-slate-300 px-2 py-1 outline-none focus:border-slate-400"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          {errors.color && (
            <p className="mt-1 text-xs text-rose-600">{errors.color}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setActive((v) => !v)}
          className={[
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            active ? 'bg-emerald-400' : 'bg-slate-300',
          ].join(' ')}
          aria-pressed={active}
          aria-label="Activo"
        >
          <span
            className={[
              'inline-block h-5 w-5 transform rounded-full bg-white transition-transform',
              active ? 'translate-x-6' : 'translate-x-1',
            ].join(' ')}
          />
        </button>
        <span className="text-slate-700">Activo</span>
      </div>

      <div className="flex justify-center gap-8 pt-2">
        <button
          type="button"
          onClick={handleCancel}
          className="min-w-[180px] rounded-md border cursor-pointer px-4 py-2 text-sm hover:bg-gray-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={!isValid || loading}
          className={[
            'min-w-[180px] rounded-md px-4 py-2 text-sm',
            'bg-slate-900 text-white',
            !isValid || loading
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:opacity-90',
          ].join(' ')}
        >
          {loading ? 'Creando…' : 'Crear'}
        </button>
      </div>
    </form>
  );
};

export default ActionForm;
