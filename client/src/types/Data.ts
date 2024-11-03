
type Post = {
    id: string;
    title: string;
    name: string;
    body: string;
    image: string
};

export type Data = {
    data: Post[];
    status: number;
    statusText: string;
};

export type PageData = {
    data: {
        data: Post[];
    };
    status: number;
    statusText: string;
    totalcount: number;
};
