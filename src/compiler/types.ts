interface ContetnItem {
    title: string,
    id: number,
    parenid?: number,
    subtitle?: number,
    namespace: string,
    channelId: number,
    highload: number,
    typeId: number,
    priority: number,
    alias: string,
    typeName: string,
    backgroundKey: number,
    template: string,
    titleHidden: boolean,
  }
   
  interface Person {
    type: string,
    id: number,
    name: string,
    surname: string,
    title: string,
    origName?: string,
    origSurname?: string,
    picId: number,
    url: string
  }