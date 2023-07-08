import { Modal } from "antd";
import { useState, useEffect } from "react";
import { Exhibition } from "../../models/Exhibition";

interface EditFormProps {
  exhibition: any;
  editFn: () => Promise<void>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditForm({ exhibition, editFn, isOpen, setIsOpen }: EditFormProps) {
    const [item, setItem] = useState<Exhibition>()
  useEffect(() => {
    if(exhibition != null){
       setItem(exhibition[0])
    }
  }, [exhibition])

  return (
    <div>
      <Modal
        onCancel={() => setIsOpen(false)}
        maskClosable={true}
        footer={null}
        centered
        open={isOpen}
        width={835}
        closable={false}
      >
        <div className="px-4 py-2 h-[500px] overflow-y-scroll">
          <h3 className="font-semibold text-main-gray-900 text-xl">
            Editar exposición
          </h3>
          <p className="text-main-gray-500">
            Completa el siguiente formulario para editar la exposición
          </p>
          {
            exhibition && (
                <div>
                    <p> {item?.name} </p>
                </div>
            )
          }
        </div>
      </Modal>
    </div>
  );
}

export default EditForm;
