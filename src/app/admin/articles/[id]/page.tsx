'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {
  const articleId = params.id;
  
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    getArticleDetails();
  }, []);
  const getArticleDetails = async () => {
    const res = await fetch(`http://localhost:3001/article/${articleId}`)
    const detail = await res.json();
    setDetail(detail.data || null);
  }
  if(detail) {
    return <ArticleDetail detail={detail} />
  }
  return <p>内容加载失败</p>;
}

const ArticleDetail = ({detail, ...props}: any) => {
  const router = useRouter();

  const handleAnchorClick = (e: any) => {
    const targetLink = e.target.closest('a');
    if(!targetLink) return;
    e.preventDefault();
    
    console.log(targetLink.href); // this.props.history.push(e.target.href)
  };

  return (
    <>
      <h1>{detail.title}</h1>
      <div
        onClick={handleAnchorClick}
        onKeyPress={handleAnchorClick}
        className="richtext"
        dangerouslySetInnerHTML={{ __html: detail.content }}
      ></div>
    </>
  )
}