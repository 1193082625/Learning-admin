'use client';

import { get, patch } from "@/api/fetch";
import { Button, Input } from "@nextui-org/react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export default function Page({ params }: { params: { id: string } }) {
  const practiceId = params.id;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<any>(null);
  const editorRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getDetail = async () => {
      const {code,data,msg} = await get(`http://localhost:3001/practices/${practiceId}`);
      
      if(code === 0) {
        setTitle(data.title);
        setContent(data.content);
      }
    }
    getDetail();
  }, [])
  
  const goBack = () => {
    router.back();
  }

  const updateArticle = async () => {
    const cont = editorRef?.current.editor.getContent()
    const params = {
      title,
      content: cont || ''
    };
    const {code, data, msg} = await patch(`/practices/${practiceId}`, params);
    if(code===0) {
      // alert('修改成功')
      router.back();
    }
  }
  
  return (
    <div>
      <h1 className="page-title">创建试题</h1>
      {
        title ? (<form>
          <div className="flex mb-6">
            <label className="w-36">
              试题标题：
            </label>
            <Input
              isRequired
              type="text"
              label="title"
              placeholder="请输入标题"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex">
            <label className="w-36">
              内容：
            </label>
            <Editor
              ref={editorRef}
              apiKey='vcfdsqcg8zdy6ij9emkivv22samhr77sg2ljm1j0l3he9940'
              init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ],
                ai_request: (request: any, respondWith: { string: (arg0: () => Promise<never>) => any; }) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
              }}
              initialValue={content}
              
            />
          </div>
        </form>
        ) : <div>加载中</div>
      }
      
      <div className="flex justify-center mt-8 gap-60">
        <Button onClick={goBack} className="w-48">返回</Button>
        <Button onClick={updateArticle} className="w-48" color="primary">完成</Button>
      </div>
    </div>
  )
}