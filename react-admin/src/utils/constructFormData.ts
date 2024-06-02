type FormValues = {
  [key: string]: FileList | string | undefined | number | null;
};

const constructFormData = (data: FormValues, imageName: string = "image") => {
  const updatedFormData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key !== imageName && value !== null) {
      updatedFormData.append(key, value as string);
    }
  });

  const imageValue = data[imageName];
  if (imageValue !== null && imageValue !== undefined) {
    if (imageValue instanceof FileList) {
      for (let i = 0; i < imageValue.length; i++) {
        updatedFormData.append(imageName, imageValue[i]);
      }
    } else {
      updatedFormData.append(imageName, imageValue as string);
    }
  }

  return updatedFormData;
};

export default constructFormData;
