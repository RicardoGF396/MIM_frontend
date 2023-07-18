import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import locale from "antd/es/date-picker/locale/es_ES";

function AddForm({
  isOpen,
  setIsOpen,
  handleAdd,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAdd: (exhibition: any) => Promise<void>;
}) {
  const [form] = Form.useForm<{
    name: string;
    participants: string;
    description: string;
    room: string;
    date: string;
    virtual_route: string;
    images: FileList | null;
  }>();

  const { RangePicker } = DatePicker;
  const { Dragger } = Upload;

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleAddExhibition = async () => {
    const images = form.getFieldValue("images");
    if (images == undefined) {
      message.error("Debes agregar al menos una imagen");
    } else {
      const formData = new FormData();
      images.forEach((image: any, index: number) => {
        formData.append("images", image.originFileObj);
      });

      const bodyForm = await form.validateFields().then((values) => {
        const date: any = values.date;
        const start_date = formatDate(date[0]["$d"]);
        const end_date = formatDate(date[1]["$d"]);
        return {
          name: values.name,
          participants: values.participants,
          description: values.description,
          start_date: start_date,
          end_date: end_date,
          room: values.room,
          virtual_route: values.virtual_route,
        };
      });

      formData.append("exhibition", JSON.stringify(bodyForm));
      //console.log(formData)
      await handleAdd(formData);
      form.resetFields();
      form.setFieldsValue({ images: null }); // O form.setFieldsValue({ images: [] });
    }
  };

  const handleImageChange = (fileList: any) => {
    form.setFieldsValue({ images: fileList });
  };

  const props = {
    beforeUpload: (file: any) => {
      if (
        file.type == "image/png" ||
        file.type == "image/jpg" ||
        file.type == "image/jpeg" ||
        file.type == "image/webp"
      ) {
        return false;
      } else {
        message.error(`${file.name} no es un archivo válido`);
        return Upload.LIST_IGNORE;
      }
    },
  };

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
            Nueva exposición
          </h3>
          <p className="text-main-gray-500">
            Completa el siguiente formulario para añadir una nueva exposición
          </p>

          <Form
            className="mt-4"
            layout="vertical"
            autoComplete="off"
            form={form}
          >
            <div className="flex gap-4">
              <Form.Item
                className="flex-1"
                name="name"
                label="Nombre de la exposición"
                rules={[
                  { required: true, message: "No dejes este campo vacío" },
                ]}
              >
                <Input placeholder="Escribe el nombre aquí..." size="large" />
              </Form.Item>
              <Form.Item
                className="flex-1"
                name="participants"
                label="Participantes"
                rules={[
                  { required: true, message: "No dejes este campo vacío" },
                ]}
              >
                <Input
                  placeholder="Escribe los participantes aquí..."
                  size="large"
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Descripción"
              className="flex-1 "
              name="description"
              rules={[{ required: true, message: "No dejes este campo vacío" }]}
            >
              <Input.TextArea
                placeholder="Descripción de la exposición..."
                size="large"
                className="resize-none"
                style={{ height: "150px", resize: "none" }}
              ></Input.TextArea>
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "No dejes este campo vacío" }]}
              label="Sala"
              className="flex-1 "
              name="room"
            >
              <Select size="large" placeholder="Selecciona una sala">
                <Select.Option value="FLEXI">Flexi</Select.Option>
                <Select.Option value="Andador Cultural">
                  Andador Cultural
                </Select.Option>
                <Select.Option value="Santander">Santander</Select.Option>
                <Select.Option value="Don Roberto González">
                  Don Roberto González
                </Select.Option>
                <Select.Option value="Temporal de Biblioteca">
                  Temporal de Biblioteca
                </Select.Option>
              </Select>
            </Form.Item>
            <div className="flex items-center gap-x-4">
              <Form.Item
                rules={[
                  { required: true, message: "No dejes este campo vacío" },
                ]}
                name="date"
                label="Duración de la exposición"
              >
                <RangePicker
                  locale={locale}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                className="flex-1"
                name="virtual_route"
                label="Recorrido virutal (opcional)"
              >
                <Input
                  placeholder="Link del recorrido virtual..."
                  size="large"
                />
              </Form.Item>
            </div>
            <Form.Item
              label={
                <label>
                  Imágenes <br />{" "}
                  <p className="text-main-gray-500">
                    La primera fotografía se tomará como portada de la
                    exposición
                  </p>
                </label>
              }
            >
              <Dragger
                listType="picture"
                {...props}
                name="images"
                multiple
                accept=".png,.jpeg,.webp,.jpg"
                onChange={({ fileList }) => handleImageChange(fileList)}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Haga clic o arrastre el archivo a esta área para cargarlo
                </p>
                <p className="ant-upload-hint">
                  Solo puedes subir imágenes con extensión .png, jpg, .jpeg o
                  .webp
                </p>
              </Dragger>
            </Form.Item>
            <div className="flex items-center gap-x-5 w-full mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="border flex-1 border-main-gray-300 text-main-gray-900 font-medium px-6 py-2 rounded-lg hover:bg-main-gray-300"
              >
                Cancelar
              </button>
              <Button
                htmlType="submit"
                onClick={handleAddExhibition}
                className="text-white flex-1 text-sm bg-[#D6006B] font-medium px-6 py-2 rounded-lg"
                size="large"
              >
                Agregar
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default AddForm;
