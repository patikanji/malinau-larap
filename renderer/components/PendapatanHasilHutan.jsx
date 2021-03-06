import { useState } from 'react'
import * as model from '../lib/sensus'
import { decimal } from '../lib/utils'
import ButtonDeleteRow from "./ButtonDeleteRow"
import Input from './Input'

export default function SectionPendapatanHasilHutan({ resdata, setResdata, flagger }) {
  const [formModel, setFormModel] = useState(null)
  return (
    <div className="bg-white text-sm text-gray-700">
      <div className="p-6 antialiased">
        <h3 className="font-bold mb-2">
          Pendapatan Dari Hasil Hutan XXX
        </h3>
        <div className="">
          <table className="w-full text-xs">
            <tbody>
              <tr className="bg-gray-200 bg-opacity-75 border-b border-gray-200">
                <td width="30" className="p-2 px-3">#</td>
                <td className="border-l border-white border-opacity-50 p-2">Produk</td>
                <td className="border-l border-white border-opacity-50 p-2">Dipakai</td>
                <td className="border-l border-white border-opacity-50 p-2">Dijual</td>
                <td className="border-l border-white border-opacity-50 p-2">Satuan</td>
                <td className="border-l border-white border-opacity-50 p-2">Hasil per tahun</td>
                <td width="60" className="border-l border-white border-opacity-50 p-2 pr-3">Action</td>
              </tr>
            </tbody>
            {resdata?.pendapatanHasilHutan.map(({produk, satuan, dipakai, keterangan, dijual, nilaiPerTahun}, index) => (
              <tbody key={`${produk}-${index}`}>
                <tr className="hover:bg-gray-50 border-b border-gray-100">
                  <td className="p-2 pl-3">{index +1}</td>
                  <td className="border-l border-gray-100 border-opacity-75 p-2">{produk}</td>
                  <td className="border-l border-gray-100 border-opacity-75 p-2">{dipakai}</td>
                  <td className="border-l border-gray-100 border-opacity-75 p-2">{dijual}</td>
                  <td className="border-l border-gray-100 border-opacity-75 p-2">{satuan}</td>
                  <td className="border-l border-gray-100 border-opacity-75 p-2">{decimal(nilaiPerTahun)}</td>
                  <td className="border-l border-gray-100 border-opacity-75 p-2 px-3">
                    <ButtonDeleteRow onClik={e => {
                      let array = [...resdata?.pendapatanHasilHutan]
                      array.splice(index, 1)
                      setResdata(prev => ({
                        ...prev,
                        pendapatanHasilHutan: array
                      }))
                      flagger()
                    }}/>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td colSpan="2" className="p-2 pl-3 text-right">Keterangan:</td>
                  <td colSpan="5" className="border-l border-gray-100 border-opacity-75 p-2">{keterangan}</td>
                </tr>
              </tbody>
            ))}
          </table>

          {formModel && <div className="border p-3 mt-2">
            <div className="flex flex-row justify-center">
              <div className="w-48 flex flex-col mr-4">
                <label className="capslabel text-gray-500">Produk</label>
                <Input flag={flagger} numeric={false} model={formModel} setter={setFormModel} path={['produk']} style="light"/>
              </div>
              <div className="w-20 flex flex-col mr-4">
                <label className="capslabel text-gray-500">Dipakai</label>
                <Input flag={flagger} numeric={true} model={formModel} setter={setFormModel} path={['dipakai']} style="light"/>
              </div>
              <div className="w-20 flex flex-col mr-4">
                <label className="capslabel text-gray-500">Dijual</label>
                <Input flag={flagger} numeric={true} model={formModel} setter={setFormModel} path={['dijual']} style="light"/>
              </div>
              <div className="w-20 flex flex-col mr-4">
                <label className="capslabel text-gray-500">Satuan</label>
                <Input flag={flagger} numeric={false} model={formModel} setter={setFormModel} path={['satuan']} style="light"/>
              </div>
              <div className="w-24 flex flex-col">
                <label className="capslabel text-gray-500">Hasil per tahun</label>
                <Input flag={flagger} numeric={true} model={formModel} setter={setFormModel} path={['nilaiPerTahun']} style="light"/>
              </div>
            </div>
            <div className="flex flex-row justify-center mt-2">
              <div className="w-96 flex flex-col mr-4">
                <label className="capslabel text-gray-500">Keterangan pemakaian</label>
                <Input flag={flagger} numeric={false} model={formModel} setter={setFormModel} path={['keterangan']} style="light"/>
              </div>
            </div>
            <div className="pt-4 text-center text-xs">
              <button
              onClick={e => { setFormModel(null) }}
              className="btn-tbl-cancel">Cancel</button>
              <button
              onClick={e => {
                setResdata(prev => ({
                  ...prev,
                  pendapatanHasilHutan: [ ...prev.pendapatanHasilHutan, formModel ]
                }))
                setFormModel(null)
                flagger()
              }}
              className="btn-tbl-save ml-2">Save</button>
            </div>
          </div>}
          {!formModel && <div className="pt-5 text-center text-xs">
            <button onClick={e => { setFormModel(model.PendapatanHasilHutan) }}
            className="btn-tbl-add"
            >Add</button>
          </div>}
        </div>
      </div>
    </div>
  )
}