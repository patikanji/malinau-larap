import { useState } from "react"
import * as model from '../lib/sensus'
import * as options from '../lib/options'
import { decimal } from "../lib/utils"
import ButtonDeleteRow from "./ButtonDeleteRow"
import Input from "./Input"
import Select from "./Select"

export default function SectionKejadianPenyakit({ resdata, setResdata, flagger }) {
  const [formModel, setFormModel] = useState(null)

  function getDaftarNamaAnggota() {
    let array = []
    resdata?.anggota.forEach(a => {
      array.push([a?.nama, a?.nama])
    })
    return array
  }

  function getUmurAnggota(nama) {
    let umur = 0
    resdata?.anggota.forEach(a => {
      if (a?.nama == nama) umur = a.umur
    })
    return umur
  }

  return (
    <div className="bg-white text-sm text-gray-700">
      <div className="p-6 antialiased">
        <h3 className="font-bold mb-2">
          Kejadian Serangan Penyakit Setahun Terakhir
        </h3>
        <div className="">
          <table className="w-full text-xs">
            <tbody>
              <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                <td width="35" className="p-2 px-3">#</td>
                <td className="border-l border-white border-opacity-50 p-2">Nama</td>
                <td className="border-l border-white border-opacity-50 p-2">Umur</td>
                <td className="border-l border-white border-opacity-50 p-2">Penyakit</td>
                <td className="border-l border-white border-opacity-50 p-2">Kategori</td>
                <td className="border-l border-white border-opacity-50 p-2">Keterangan</td>
                <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
              </tr>
              {resdata?.kejadianPenyakit.map(({nama, umur, penyakit, kategori, keterangan}, index) => (
              <tr key={`${nama}-${index}`} className="hover:bg-gray-50 border-b border-gray-100">
                <td className="p-2 pl-3">{index +1}</td>
                <td className="border-l border-gray-100 border-opacity-75 p-2">{nama}</td>
                <td className="border-l border-gray-100 border-opacity-75 p-2">{umur}</td>
                <td className="border-l border-gray-100 border-opacity-75 p-2">{penyakit}</td>
                <td className="border-l border-gray-100 border-opacity-75 p-2">{kategori}</td>
                <td className="border-l border-gray-100 border-opacity-75 p-2">{keterangan}</td>
                <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">
                  <ButtonDeleteRow onClik={e => {
                    let array = [...resdata?.kejadianPenyakit]
                    array.splice(index, 1)
                    setResdata(prev => ({
                      ...prev,
                      kejadianPenyakit: array
                    }))
                    flagger()
                  }}/>
                </td>
              </tr>
              ))}
            </tbody>
          </table>

          {formModel && <div className="border p-3 mt-2">
            <div className="flex flex-row justify-center">
              <div className="w-32 flex flex-col mr-4">
                <label className="capslabel text-gray-500">Nama</label>
                {/* <Input numeric={false} model={formModel} setter={setFormModel} path={['nama']} style="light"/> */}
                <Select flag={flagger} options={getDaftarNamaAnggota()} model={formModel} setter={setFormModel} path={['nama']} style="light"/>
              </div>
              <div className="w-10 flex flex-col mr-4">
                <label className="capslabel text-gray-500">Umur</label>
                {/* <Input flag={flagger} numeric={true} model={formModel} setter={setFormModel} path={['umur']} style="light"/> */}
                <input type="text" disabled
                  className="text-xs leading-normal bg-gray-100 px-2 py-1 border-b border-l border-transparent hover:border-gray-300 focus:bg-white focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div className="w-32 flex flex-col mr-4">
                <label className="capslabel text-gray-500">Penyakit</label>
                {/* <Input numeric={true} model={formModel} setter={setFormModel} path={['penyakit']} style="light"/> */}
                <Select flag={flagger} options={options.optPenyakit} model={formModel} setter={setFormModel} path={['penyakit']} style="light"/>
              </div>
              <div className="w-20 flex flex-col mr-4">
                <label className="capslabel text-gray-500">Kategori</label>
                {/* <Input numeric={false} model={formModel} setter={setFormModel} path={['kategori']} style="light"/> */}
                <Select flag={flagger} options={options.optKategoriPenyakit} model={formModel} setter={setFormModel} path={['kategori']} style="light"/>
              </div>
              <div className="w-40 flex flex-col">
                <label className="capslabel text-gray-500">Keterangan</label>
                <Input flag={flagger} numeric={false} model={formModel} setter={setFormModel} path={['keterangan']} style="light"/>
              </div>
            </div>
            <div className="pt-4 text-center text-xs">
              <button
              onClick={e => { setFormModel(null) }}
              className="btn-tbl-cancel">Cancel</button>
              <button
              onClick={e => {
                // Fill umur
                formModel.umur = getUmurAnggota(formModel.nama)

                setResdata(prev => ({
                  ...prev,
                  kejadianPenyakit: [ ...prev.kejadianPenyakit, formModel ]
                }))
                setFormModel(null)
                flagger()
              }}
              className="btn-tbl-save ml-2">Save</button>
            </div>
          </div>}
          {!formModel && <div className="pt-5 text-center text-xs">
            <button onClick={e => { setFormModel(model.KejadianPenyakit) }}
            className="btn-tbl-add"
            >Add</button>
          </div>}
        </div>
      </div>
    </div>
  )
}