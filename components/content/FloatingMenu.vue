<script setup lang="ts">
import { FloatingMenu, Editor } from '@tiptap/vue-3'

defineProps<{
  editor: Editor | undefined
}>()

defineEmits(['openFigureModal'])
</script>

<template>
  <floating-menu
    v-if="editor"
    :editor="editor"
    :tippy-options="{
      duration: 100,
      hideOnClick: true
    }"
  >
    <UContextMenu
      :model-value="true"
      :virtual-element="{ getBoundingClientRect: () => ({}) }"
    >
      <div class="p-1 min-w-max max-h-72 flex flex-col gap-1 overflow-y-auto">
        <UButton
          icon="i-material-symbols-format-bold"
          label="Bold"
          color="black"
          :variant="editor.isActive('bold') ? 'solid' : 'soft'"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          class="rounded-sm"
          @click="editor.chain().focus().toggleBold().run()"
        />

        <UButton
          icon="i-material-symbols-format-italic"
          label="Italic"
          color="black"
          :variant="editor.isActive('italic') ? 'solid' : 'soft'"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          class="rounded-sm"
          @click="editor.chain().focus().toggleItalic().run()"
        />

        <UButton
          icon="i-material-symbols-format-strikethrough"
          label="Strikethrough"
          color="black"
          :variant="editor.isActive('strike') ? 'solid' : 'soft'"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          class="rounded-sm"
          @click="editor.chain().focus().toggleStrike().run()"
        />

        <UButton
          icon="i-material-symbols-code"
          label="Code"
          color="black"
          :variant="editor.isActive('code') ? 'solid' : 'soft'"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          class="rounded-sm"
          @click="editor.chain().focus().toggleCode().run()"
        />

        <UButton
          icon="i-material-symbols-format-paragraph"
          label="Paragraph"
          color="black"
          :variant="editor.isActive('paragraph') ? 'solid' : 'soft'"
          :disabled="!editor.can().chain().focus().setParagraph().run()"
          class="rounded-sm"
          @click="editor.chain().focus().setParagraph().run()"
        />

        <UButton
          icon="i-material-symbols-format-h1"
          label="Heading 1"
          color="black"
          :variant="editor.isActive('heading', { level: 1 }) ? 'solid' : 'soft'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        />

        <UButton
          icon="i-material-symbols-format-h2"
          label="Heading 2"
          color="black"
          :variant="editor.isActive('heading', { level: 2 }) ? 'solid' : 'soft'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        />

        <UButton
          icon="i-material-symbols-format-h3"
          label="Heading 3"
          color="black"
          :variant="editor.isActive('heading', { level: 3 }) ? 'solid' : 'soft'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        />

        <UButton
          icon="i-material-symbols-format-h4"
          label="Heading 4"
          color="black"
          :variant="editor.isActive('heading', { level: 4 }) ? 'solid' : 'soft'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        />

        <UButton
          icon="i-material-symbols-format-h5"
          label="Heading 5"
          color="black"
          :variant="editor.isActive('heading', { level: 5 }) ? 'solid' : 'soft'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        />

        <UButton
          icon="i-material-symbols-format-h6"
          label="Heading 6"
          color="black"
          :variant="editor.isActive('heading', { level: 6 }) ? 'solid' : 'soft'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        />

        <UButton
          icon="i-material-symbols-format-list-bulleted"
          label="Bulleted List"
          color="black"
          :variant="editor.isActive('bulletList') ? 'solid' : 'soft'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleBulletList().run()"
        />

        <UButton
          icon="i-material-symbols-format-list-numbered"
          label="Numbered List"
          color="black"
          :variant="editor.isActive('orderedList') ? 'solid' : 'soft'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleOrderedList().run()"
        />

        <UButton
          icon="i-material-symbols-code-blocks"
          label="Codeblock"
          color="black"
          :variant="editor.isActive('codeBlock') ? 'solid' : 'soft'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        />

        <UButton
          icon="i-material-symbols-format-quote"
          label="Quote"
          color="black"
          :variant="editor.isActive('blockquote') ? 'solid' : 'soft'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleBlockquote().run()"
        />

        <UButton
          icon="i-material-symbols-horizontal-rule"
          label="Horizontal Rule"
          color="black"
          variant="soft"
          class="rounded-sm"
          @click="editor.chain().focus().setHorizontalRule().run()"
        />

        <UButton
          icon="i-material-symbols-insert-page-break"
          label="Page Break"
          color="black"
          variant="soft"
          class="rounded-sm"
          @click="editor.chain().focus().setHardBreak().run()"
        />

        <UButton
          icon="i-material-symbols-imagesmode-outline"
          label="Figure"
          color="black"
          variant="soft"
          class="rounded-sm"
          @click="$emit('openFigureModal')"
        />
      </div>
    </UContextMenu>
  </floating-menu>
</template>
