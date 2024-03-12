'use client';

import { post } from "@/api/fetch";
import { Button, Input } from "@nextui-org/react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Page() {
  const [title, setTitle] = useState('');
  const editorRef = useRef<any>(null);
  const router = useRouter();

  const goBack = () => {
    router.back();
  }

  const createArticle = async () => {
    const cont = editorRef?.current.editor.getContent()
    const params = {
      title,
      content: cont || ''
    };
    const {code, data, msg} = await post('/articles/', params);
    if(code===0) {
      // alert('创建成功')
      router.back();
    }
  }
  
  return (
    <div>
      <h1 className="page-title">创建文章</h1>
      <form>
        <div className="flex mb-6">
          <label className="w-36">
            文章标题：
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
            initialValue="Welcome to TinyMCE!"
            
          />
        </div>
      </form>
      <div className="flex justify-center mt-8 gap-60">
        <Button onClick={goBack} className="w-48">返回</Button>
        <Button onClick={createArticle} className="w-48" color="primary">创建</Button>
      </div>
    </div>
  )
}